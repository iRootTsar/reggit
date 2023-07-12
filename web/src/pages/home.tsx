import React, {useContext, useEffect, useState} from 'react';
import {VisitService} from '../clients/reggit-api/index';
import {Visitor} from '../clients/reggit-api/models/Visitor';
import UserInfoModal from 'src/components/table/UserOverlayModal';
import VisitorList from 'src/components/table/VisitorList';
import {SearchContext} from 'src/components/common/SearchContext';

const Home: React.FC = () => {
    const [visits, setVisits] = useState([] as Visitor[]);
    const {searchTerm} = useContext(SearchContext);
    const [selectedVisitor, setSelectedVisitor] = useState<Visitor>();
    const [modalOpen, setModalOpen] = useState(false);

    // create hook for loading visits
    const getVisits = async () => {
        // setLoading(true);
        VisitService.getVisitors()
            .then(response => {
                setVisits(response);
                //   setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getVisits();
    }, []);

    // Function for refreshing table
    const fetchVisitorsAgain = () => {
        getVisits();
    };

    return (
        <div className="flex flex-col">
            <VisitorList
                visits={visits}
                searchTerm={searchTerm}
                onVisitorSelect={visitor => {
                    setSelectedVisitor(visitor);
                    setModalOpen(true);
                }}
            />
            <UserInfoModal
                open={modalOpen}
                setOpen={setModalOpen}
                selectedVisitor={selectedVisitor}
                refreshTable={fetchVisitorsAgain}
            />
        </div>
    );
};

export default Home;
