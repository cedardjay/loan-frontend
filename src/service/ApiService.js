import axios from "axios"

export default class ApiService {

    static BASE_URL = import.meta.env.VITE_API_BASE_URL;

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }


    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isSuperAdmin() {
        const role = localStorage.getItem('role')
        return role === 'SUPERADMIN'
    }


    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }




    /***USERS */

    /*  This is  to get the user profile */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is the  to get a single user */
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }



    /* This is to delete a user */
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /** LOANS */
    /* Submit a new loan request */
    static async requestLoan(loanData) {
        const response = await axios.post(`${this.BASE_URL}/loan-requests/create`, loanData, {
            headers: this.getHeader()
        });
        return response.data;
    }



    /** LOAN REQUESTS */

    /* Get all loan requests for the logged-in user */
    static async getUserLoanRequests() {
        const response = await axios.get(`${this.BASE_URL}/loan-requests/my-requests/all`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Get a specific loan request by ID */
    static async getLoanRequestById(requestId) {
        const response = await axios.get(`${this.BASE_URL}/loan-requests/${requestId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Cancel a loan request */
    static async cancelLoanRequest(requestId) {
        const response = await axios.delete(`${this.BASE_URL}/loan-requests/${requestId}/cancel`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Get all loan requests (admin) */
    static async getAllLoanRequests() {
        const response = await axios.get(`${this.BASE_URL}/loan-requests/all`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Approve a loan request */
    static async approveLoanRequest(requestId) {
        const response = await axios.put(`${this.BASE_URL}/loan-requests/${requestId}/approve`, {}, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Reject a loan request */
    static async rejectLoanRequest(requestId) {
        const response = await axios.put(`${this.BASE_URL}/loan-requests/${requestId}/reject`, {}, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async disburseLoan(id) {
        const response = await axios.post(`${this.BASE_URL}/disbursal/${id}/approve`, {}, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Get marketplace loans (APPROVED, PARTIALLY_FUNDED, FULLY_FUNDED) */
    static async getMarketplaceLoans() {
        const response = await axios.get(`${this.BASE_URL}/loan-requests/marketplace`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getMyActiveLoans() {
        const response = await axios.get(`${this.BASE_URL}/loan-requests/my-active`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getMyMarketplaceLoans() {
        const response = await axios.get(`${this.BASE_URL}/loan-requests/my-marketplace`, {
            headers: this.getHeader()
        });
        return response.data;
    }



    /** PAYMENT ACCOUNTS (DISBURSEMENT ACCOUNTS) */

    /* Get all disbursement accounts for the logged-in user */
    static async getPaymentAccounts() {
        const response = await axios.get(`${this.BASE_URL}/payment-accounts`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Create a new disbursement account */
    static async createPaymentAccount(accountData) {
        const response = await axios.post(`${this.BASE_URL}/payment-accounts`, accountData, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Request disbursal for a fully funded loan */
    static async requestDisbursal(loanRequestId, payoutAccountId) {
        const response = await axios.post(`${this.BASE_URL}/disbursal/request`,
            { loanRequestId, payoutAccountId },
            { headers: this.getHeader() }
        );
        return response.data;
    }

    /* Get repayment schedule for a loan */
    static async getRepaymentSchedule(loanRequestId) {
        const response = await axios.get(`${this.BASE_URL}/loan-requests/my-requests/${loanRequestId}/repayment-schedule`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Submit a loan repayment */
    static async makeLoanPayment(loanId, payerDetails) {
        const response = await axios.post(`${this.BASE_URL}/payments/${loanId}`, payerDetails, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Poll transaction status */
    static async getTransactionStatus(paymentReference) {
        const response = await axios.get(`${this.BASE_URL}/transactions/${paymentReference}/status`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllTransactions() {
        const response = await axios.get(`${this.BASE_URL}/transactions/all`, {
            headers: this.getHeader()
        });
        return response.data;
    }

}





// export default new ApiService();