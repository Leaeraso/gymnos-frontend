import { useState, useEffect } from 'react';

export function useClientDate() {
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    return currentDate;
} 