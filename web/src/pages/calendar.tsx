import React, {useState} from 'react';
import DayView from '../components/calendar/DayView';
import WeekView from 'src/components/calendar/WeekView';
import MonthView from 'src/components/calendar/MonthView';
import CalendarHeader from 'src/components/calendar/CalendarHeader';

const Calendar: React.FC = () => {
    const [view, setView] = useState('day'); // default view is 'Daily view'

    return (
        <div className="flex flex-col">
            <CalendarHeader setView={setView} />
            {view === 'day' && <DayView />}
            {view === 'week' && <WeekView />}
            {view === 'month' && <MonthView />}
        </div>
    );
};

export default Calendar;
