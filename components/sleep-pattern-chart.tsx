"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

Chart.register(...registerables);

const SleepPatternChart: React.FC<{ sleepLogs: { duration: string; time: string }[] }> = ({ sleepLogs }) => {
    const data = {
        labels: sleepLogs.map((log) => log.time),
        datasets: [
            {
                label: "Sleep Duration (hours)",
                data: sleepLogs.map((log) => parseFloat(log.duration)),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderWidth: 2,
                tension: 0.3,
            },
        ],
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-2xl p-4">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">Sleep Pattern Chart</CardTitle>
            </CardHeader>
            <CardContent>
                <Line data={data} />
            </CardContent>
        </Card>
    );
};

export default SleepPatternChart;
