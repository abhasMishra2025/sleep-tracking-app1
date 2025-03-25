"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";

const Insights: React.FC<{ sleepLogs: { duration: string; time: string }[] }> = ({ sleepLogs }) => {
    const totalSleep = sleepLogs.reduce((total, log) => total + parseFloat(log.duration), 0);
    const averageSleep = sleepLogs.length > 0 ? totalSleep / sleepLogs.length : 0;
    const isSleepDeficient = averageSleep < 7;

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-900">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
                    Sleep Insights
                </CardTitle>
            </CardHeader>
            <Separator className="my-2" />
            <CardContent className="space-y-3 text-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Total Sleep: <span className="font-semibold">{totalSleep.toFixed(2)} hours</span>
                </p>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Average Sleep: <span className="font-semibold">{averageSleep.toFixed(2)} hours</span>
                </p>

                {/* Updated Alert Component */}
                <Alert className={`mt-4 flex items-center ${isSleepDeficient ? "bg-red-100 border-red-500 text-red-700" : "bg-green-100 border-green-500 text-green-700"} border-l-4 p-3 rounded-md`}>
                    {isSleepDeficient ? <AlertTriangle className="h-5 w-5 text-red-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />}
                    <AlertDescription className="ml-2">
                        {isSleepDeficient ? "Consider improving your sleep quality!" : "Great job on your sleep!"}
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
};

export default Insights;
