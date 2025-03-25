"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar, Moon, Sun, Star } from "lucide-react"; // Lucide icons

const SleepLogForm: React.FC<{ onAddSleepLog: (log: { duration: string; time: string }) => void }> = ({ onAddSleepLog }) => {
    const [date, setDate] = useState("");
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [sleepQuality, setSleepQuality] = useState(3);
    const [estimatedDuration, setEstimatedDuration] = useState("");

    // 🔹 Update estimated duration dynamically when sleepTime or wakeTime changes
    useEffect(() => {
        if (date && sleepTime && wakeTime) {
            const sleepDateTime = `${date}T${sleepTime}`;
            const wakeDateTime = calculateWakeDateTime(date, sleepTime, wakeTime);
            const duration = calculateDuration(sleepDateTime, wakeDateTime);
            setEstimatedDuration(duration);
        }
    }, [sleepTime, wakeTime, date]); // Trigger effect on changes

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (date && sleepTime && wakeTime) {
            const sleepDateTime = `${date}T${sleepTime}`;
            const wakeDateTime = calculateWakeDateTime(date, sleepTime, wakeTime);
            const duration = calculateDuration(sleepDateTime, wakeDateTime);
            
            if (parseFloat(duration) > 0) {
                onAddSleepLog({ duration, time: sleepDateTime });

                // Reset form but keep estimated duration
                setDate("");
                setSleepTime("");
                setWakeTime("");
                setSleepQuality(3);
            }
        }
    };

    const calculateWakeDateTime = (date: string, sleep: string, wake: string) => {
        const sleepDateTime = new Date(`${date}T${sleep}`);
        let wakeDateTime = new Date(`${date}T${wake}`);

        if (wakeDateTime <= sleepDateTime) {
            // If wake time is earlier, assume it's the next day
            wakeDateTime.setDate(wakeDateTime.getDate() + 1);
        }

        return wakeDateTime.toISOString();
    };

    const calculateDuration = (sleep: string, wake: string) => {
        const sleepDateTime = new Date(sleep);
        const wakeDateTime = new Date(wake);

        const duration = (wakeDateTime.getTime() - sleepDateTime.getTime()) / (1000 * 60 * 60);
        return duration.toFixed(2); // Returns duration as a string
    };

    return (
        <Card className="w-full max-w-lg mx-auto shadow-xl rounded-2xl p-6 bg-white">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Log Your Sleep</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Date Input */}
                    <div>
                        <Label className="font-medium flex items-center gap-2 mb-2">
                            <Calendar className="w-5 h-5 text-gray-600" /> Date
                        </Label>
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>

                    {/* Sleep & Wake Time Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="font-medium flex items-center gap-2 mb-2">
                                <Moon className="w-5 h-5 text-gray-600" /> Sleep Time
                            </Label>
                            <Input type="time" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} required />
                        </div>
                        <div>
                            <Label className="font-medium flex items-center gap-2 mb-2">
                                <Sun className="w-5 h-5 text-gray-600" /> Wake Time
                            </Label>
                            <Input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} required />
                        </div>
                    </div>

                    {/* Sleep Quality Slider */}
                    <div>
                        <Label className="font-medium flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-yellow-500" /> Sleep Quality
                        </Label>
                        <Slider min={1} max={5} step={1} value={[sleepQuality]} onValueChange={(value) => setSleepQuality(value[0])} />
                        <p className="text-center mt-1 text-sm text-gray-600 mb-2">Quality: {sleepQuality}/5</p>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg">
                        Log Sleep
                    </Button>

                    {/* Estimated Sleep Duration - Updated Dynamically */}
                    {estimatedDuration && (
                        <div className="mt-4 text-center text-lg font-semibold text-gray-700">
                            Estimated Sleep Duration: <span className="text-blue-600">{estimatedDuration} hours</span>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default SleepLogForm;
