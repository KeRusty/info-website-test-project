import React, { useState, useEffect } from 'react';
import api from '../../Utils/API';

// Components
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import PeopleTable from '../../Components/PeopleTable/PeopleTable';

// Styles
import './Dataset.scss';

function Dataset() {
    let isMobile = window.matchMedia('(max-width: 600px)').matches;
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<TableData[]>([]);

    const [search, setSearch] = useState('')

    const loadDataSet = async () => {
        setLoading(true)
        try {
            // GET request
            const response = await api.get(`?results=10`);
            setData(response.results)

            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
        setLoading(false)
    }

    const searchList = (type: string, value: string) => {
        let newArr: any[] = []
        if (type === "name") {
            newArr = data.filter((item) => item.name.first === value)
        } else if (type === "age") {
            newArr = data.filter((item) => item.dob.age === value)
        } else if (type === "gender") {
            newArr = data.filter((item) => item.gender === value)
        } else if (type === "country") {
            newArr = data.filter((item) => item.location.country === value)
        }
        setData(newArr)
    }

    useEffect(() => {
        loadDataSet()
    }, []);

    return (
        <div className={isMobile ? 'dataset-container-mobile' : 'dataset-container'}>
            {loading &&
                <LoadingSpinner />
            }
            {!loading &&
                <div className='table-dataset-container'>
                    <PeopleTable tableData={data} setTableData={setData} search={search} setSearch={setSearch} searchList={searchList} onReset={loadDataSet} />
                </div>

            }
        </div>
    )
}

export default Dataset;

interface TableData {
    id: any;
    name: any;
    dob: any;
    gender: string;
    cell: string;
    email: string;
    phone: string;
    location: any;
}