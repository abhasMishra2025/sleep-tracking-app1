"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SleepHistory: React.FC<{ sleepLogs: { duration: string; time: string }[] }> = ({ sleepLogs }) => {
    return (
        <Card className="w-full max-w-lg mx-auto shadow-lg rounded-2xl p-4">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">Sleep History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="w-full border border-gray-200 rounded-lg">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-left font-semibold">Date</TableHead>
                            <TableHead className="text-left font-semibold">Duration (hrs)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sleepLogs.map((log, index) => (
                            <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <TableCell>{log.time}</TableCell>
                                <TableCell>{log.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default SleepHistory;
