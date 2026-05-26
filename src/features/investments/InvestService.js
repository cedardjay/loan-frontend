import axios from "axios"

export default class InvestService {

    static BASE_URL =
        import.meta.env.VITE_API_BASE_URL;

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    static async investInLoan(loanRequestId, amount) {
        const response = await axios.post(
            `${this.BASE_URL}/match-request/invest/${loanRequestId}`, {
                amount
            }, {
                headers: this.getHeader()
            }
        );
        return response.data;
    }

    static async getInvestorPortfolioSummary() {
        const response = await axios.get(
            `${this.BASE_URL}/match-request/portfolio/summary`, {
                headers: this.getHeader()
            }
        );
        return response.data;
    }

    static async getMyInvestments(status = 'all', search = '') {
        const params = new URLSearchParams();
        if (status !== 'all') params.append('status', status);
        if (search) params.append('search', search);

        const response = await axios.get(
            `${this.BASE_URL}/match-request/investments?${params}`, {
                headers: this.getHeader()
            }
        );
        return response.data;
    }
}