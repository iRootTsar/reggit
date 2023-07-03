import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';
import DayHeader from './molecules/DayHeader';
import DayGrid from './molecules/DayGrid';

function generateCalendar(year: number, month: number): any[] {
    // The start and end dates of the month
    let start = new Date(year, month, 1);
    let end = new Date(year, month + 1, 0);

    // The dates of the previous and next month that show in the current calendar view
    let prevMonthOverflow = start.getDay();
    let nextMonthOverflow = 6 - end.getDay();

    // Generate the dates
    let days: any[] = [];
    for (let i = 0; i < prevMonthOverflow; i++) {
        days.push({
            date: new Date(year, month, i - prevMonthOverflow + 1)
                .toISOString()
                .slice(0, 10),
        });
    }
    for (let i = 1; i <= end.getDate(); i++) {
        days.push({
            date: new Date(year, month, i).toISOString().slice(0, 10),
            isCurrentMonth: true,
        });
    }
    for (let i = 1; i <= nextMonthOverflow; i++) {
        days.push({
            date: new Date(year, month + 1, i).toISOString().slice(0, 10),
        });
    }

    // Check if today is in the current month and set isToday flag
    let today = new Date();
    if (today.getFullYear() === year && today.getMonth() === month) {
        days[today.getDate() + prevMonthOverflow - 1].isToday = true;
    }

    return days;
}

let now = new Date();
let days = generateCalendar(now.getFullYear(), now.getMonth());

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}

const Calendar = () => {
    return (
        <div className="flex h-full flex-col">
            <div className="isolate flex flex-auto overflow-hidden bg-white">
                <DayGrid />
                <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
                    <div className="flex items-center text-center text-gray-900">
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        <div className="flex-auto text-sm font-semibold">
                            January 2022
                        </div>
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                    <DayHeader />
                    <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {days.map((day, dayIdx) => (
                            <button
                                key={day.date}
                                type="button"
                                className={classNames(
                                    'py-1.5 hover:bg-gray-100 focus:z-10',
                                    day.isCurrentMonth
                                        ? 'bg-white'
                                        : 'bg-gray-50',
                                    (day.isSelected || day.isToday) &&
                                        'font-semibold',
                                    day.isSelected && 'text-white',
                                    !day.isSelected &&
                                        day.isCurrentMonth &&
                                        !day.isToday &&
                                        'text-gray-900',
                                    !day.isSelected &&
                                        !day.isCurrentMonth &&
                                        !day.isToday &&
                                        'text-gray-400',
                                    day.isToday &&
                                        !day.isSelected &&
                                        'text-indigo-600',
                                    dayIdx === 0 && 'rounded-tl-lg',
                                    dayIdx === 6 && 'rounded-tr-lg',
                                    dayIdx === days.length - 7 &&
                                        'rounded-bl-lg',
                                    dayIdx === days.length - 1 &&
                                        'rounded-br-lg'
                                )}>
                                <time
                                    dateTime={day.date}
                                    className={classNames(
                                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                        day.isSelected &&
                                            day.isToday &&
                                            'bg-indigo-600',
                                        day.isSelected &&
                                            !day.isToday &&
                                            'bg-gray-900'
                                    )}>
                                    {day.date
                                        .split('-')
                                        .pop()
                                        .replace(/^0/, '')}
                                </time>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
