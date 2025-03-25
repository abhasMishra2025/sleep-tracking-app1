"use client";
import React, { useState } from "react";
import SleepLogForm from "@/components/sleep-log-form";
import SleepHistory from "@/components/sleep-history";
import SleepPatternChart from "@/components/sleep-pattern-chart";
import Insights from "@/components/insights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const MainPage: React.FC = () => {
    const [sleepLogs, setSleepLogs] = useState<{ duration: string; time: string }[]>([]);

    const handleAddSleepLog = (log: { duration: string; time: string }) => {
        setSleepLogs([...sleepLogs, log]);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Sleep Tracking Application</h1>
            <Tabs defaultValue="log">
                <TabsList className="flex justify-center items-center mx-auto w-full max-w-md">
                    <TabsTrigger value="log">Log Sleep</TabsTrigger>
                    <TabsTrigger value="history">Sleep History</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>
                <TabsContent value="log">
                    <SleepLogForm onAddSleepLog={handleAddSleepLog} />
                </TabsContent>
                <TabsContent value="history">
                    <Card>
                        <CardContent className="p-4 space-y-4">
                                <CardContent className="p-4">
                                    <SleepPatternChart sleepLogs={sleepLogs} />
                                </CardContent>
                                <CardContent className="p-4">
                                    <SleepHistory sleepLogs={sleepLogs} />
                                </CardContent>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="insights">
                    <Insights sleepLogs={sleepLogs} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MainPage;
