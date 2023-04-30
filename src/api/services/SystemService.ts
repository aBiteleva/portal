const staticPath = 'http://localhost:4000';
export class SystemService {
    systemList = async (attached: boolean = true) => {
        const resp = await fetch(`${staticPath}/system?attached=${attached}`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImNvZGUiOiIwMDAwMSIsImN1cnJlbnREYXRlIjoxNjgyODQ5MzU2NjU2LCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODI4NDkzNTYsImV4cCI6MTY4Mjg1MTE1Nn0.SNvhDMAubuW9alaMF3D6Rvlna1xL0mtDvP1ERtbCLsA',
                'Content-Type': 'text/plain',
            },
        });
        return resp.json();
    }
}

export const systemService = new SystemService();

