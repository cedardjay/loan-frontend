import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

// ─── Users Management Page ────────────────────────────────
export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getAllUsers();
      setUsers(data.userList || []);
    } catch (err) {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function roleBadge(role) {
    switch (role) {
      case "SUPERADMIN": return "bg-purple-100 text-purple-600";
      case "ADMIN": return "bg-blue-100 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  }

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">User Management</h1>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-bold hover:opacity-90"
        >
          ↻ Refresh
        </button>
      </div>

      {/* States */}
      {loading && <p className="text-gray-500 text-sm">Loading users...</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="pb-2">ID</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Phone</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">#{user.id}</td>
                    <td className="font-medium">{user.name}</td>
                    <td className="text-gray-500">{user.phoneNumber}</td>
                    <td>
                      <span className={`px-2 py-1 text-xs rounded font-bold ${roleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:opacity-90"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}