import React from 'react';
import {useRef} from 'react';

const DayGrid = () => {
    const containerOffset = useRef<HTMLDivElement>(null);

    return (
        <div className="flex w-full flex-auto">
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
                <div
                    className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                    style={{
                        gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))',
                    }}>
                    <div ref={containerOffset} className="row-end-1 h-7"></div>
                    {Array.from({length: 24}, (_, i) => {
                        let hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
                        let period = i < 12 ? 'AM' : 'PM';
                        return (
                            <React.Fragment key={i}>
                                <div>
                                    <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                        {`${hour}${period}`}
                                    </div>
                                </div>
                                <div />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DayGrid;
