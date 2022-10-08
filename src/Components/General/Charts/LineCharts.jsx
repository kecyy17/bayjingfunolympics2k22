import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend,AreaChart, Area } from 'recharts'

export const LineCharts = () => {
    const data = [
        { name: 'Jan', Total: 1200},
        { name: 'Feb', Total: 100},
        { name: 'Mar', Total: 2200},
        { name: 'Apr', Total: 1900},
        { name: 'May', Total: 1900},
        { name: 'Jun', Total: 900},
        { name: 'Jul', Total: 1500},
        { name: 'Aug', Total: 2000},
        { name: 'Sept', Total: 1900},
        { name: 'Oct', Total: 600},
        { name: 'Nov', Total: 1100},
        { name: 'Dec', Total: 1900}
      ];

    return (
        <ResponsiveContainer width="100%" aspect={2/1}> 
            <AreaChart width={730} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Total" stroke="#8884d8" />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </AreaChart>
        </ResponsiveContainer>
    )
}