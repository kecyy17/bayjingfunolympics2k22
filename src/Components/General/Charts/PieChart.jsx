import { CanvasJSChart } from 'canvasjs-react-charts';
import {ResponsiveContainer, Pie, Cell} from 'recharts'

export const PieChartWrapper = ({data}) => {
    const COLORS = ["#00C49F","#FA9494", "#FF8042"];
    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Graphical Representation of Users"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            dataPoints: data
        }]
    }
    return (
        <ResponsiveContainer height={"100%"} width={"100%"}> 
            <CanvasJSChart options = {options}/>
        </ResponsiveContainer>
    )
}