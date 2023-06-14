import React, { useMemo, useState } from 'react';

// Assets
import Sort from '../../Assets/sort.png'

// styles
import './PeopleTable.scss'

function PeopleTable({ tableData, setTableData, search, setSearch, searchList, onReset }: PeopleTableProps) {
    let isMobile = window.matchMedia('(max-width: 600px)').matches;
    const [sortColumn, setSortColumn] = useState<string>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const [searchTerm, setSearchTerm] = useState<string>('')

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedTableData = useMemo(() => {
        const sortedData = [...tableData];

        sortedData.sort((a, b) => {
            let aValue;
            let bValue;

            if (sortColumn === 'name') {
                aValue = a.name.first;
                bValue = b.name.first;
            } else if (sortColumn === 'age') {
                aValue = a.dob.age;
                bValue = b.dob.age;
            } else if (sortColumn === 'gender') {
                aValue = a.gender;
                bValue = b.gender;
            } else if (sortColumn === 'country') {
                aValue = a.location.country;
                bValue = b.location.country;
            } else {
                aValue = '';
                bValue = '';
            }

            if (sortDirection === 'asc') {
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
            } else {
                if (aValue > bValue) return -1;
                if (aValue < bValue) return 1;
            }

            return 0;
        });

        return sortedData;
    }, [tableData, sortColumn, sortDirection]);

    const onSearch = (type: string) => {
        searchList(type, searchTerm)
    }

    return (
        <div style={{ width: '100%' }}>

            <div className={isMobile ? 'dataset-search-container-mobile' : 'dataset-search-container'}>
                <div>
                    <h3>Enter a search term: </h3>
                    <input type='text' className='table-input' placeholder="Enter a search term" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                {!isMobile &&
                    <div className='table-button-container'>
                        <button className='search-button' onClick={() => onSearch('name')}>Search Name</button>
                        <button className='search-button' onClick={() => onSearch('age')}>Search Age</button>
                        <button className='search-button' onClick={() => onSearch('gender')}>Search Gender</button>
                        <button className='search-button' onClick={() => onSearch('country')}>Search Country</button>
                        <button className='search-button-alt' onClick={() => onReset()}>Reset</button>
                    </div>
                }
                {isMobile &&
                    <div>
                        <div className='table-button-container'>
                            <button className='search-button' onClick={() => onSearch('name')}>Search Name</button>
                            <button className='search-button' onClick={() => onSearch('age')}>Search Age</button>
                            <button className='search-button' onClick={() => onSearch('gender')}>Search Gender</button>
                        </div>
                        <div className='table-button-container'>

                            <button className='search-button' onClick={() => onSearch('country')}>Search Country</button>
                            <button className='search-button-alt' onClick={() => onReset()}>Reset</button>
                        </div>
                    </div>

                }

            </div>

            <table className='table-container'>
                <thead>
                    <tr className='table-header-row' style={{ borderBottom: '1px solid #000', backgroundColor: '#fff' }}>
                        <th className='tableHeader' onClick={() => handleSort('name')}>
                            <div className='tableHeaderSort'>
                                <p>Name</p>
                                <img src={Sort} alt='sort' style={{ width: 15, height: 20, marginInlineStart: 10, marginTop: 2, cursor: 'pointer' }} />
                            </div>
                        </th>
                        <th className='tableHeader' onClick={() => handleSort('age')}>
                            <div className='tableHeaderSort'>
                                <p>Age</p>
                                <img src={Sort} alt='sort' style={{ width: 15, height: 20, marginInlineStart: 10, marginTop: 2, cursor: 'pointer' }} />
                            </div>
                        </th>
                        <th className='tableHeader'>
                            <div className='tableHeaderSort' onClick={() => handleSort('gender')}>
                                <p>Gender</p>
                                <img src={Sort} alt='sort' style={{ width: 15, height: 20, marginInlineStart: 10, marginTop: 2, cursor: 'pointer' }} />
                            </div>
                        </th>
                        <th className='tableHeader'>
                            <div className='tableHeaderSort' onClick={() => handleSort('country')}>
                                <p>Country</p>
                                <img src={Sort} alt='sort' style={{ width: 15, height: 20, marginInlineStart: 10, marginTop: 2, cursor: 'pointer' }} />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTableData.length > 0 &&
                        sortedTableData.map((data: TableData) => (
                            <tr
                                key={data.cell}
                                className='table-data-row'
                            >
                                <td className='tableData'> {data.name.first}</td>
                                <td className='tableData'>{data.dob.age}</td>
                                <td className='tableData'>{data.gender}</td>
                                <td className='tableData'>{data.location.country}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>

    )
}

export default PeopleTable;

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

interface PeopleTableProps {
    tableData: TableData[];
    search: string;
    searchList: any;
    onReset: any;
    setSearch: React.Dispatch<React.SetStateAction<any>>;
    setTableData: React.Dispatch<React.SetStateAction<TableData[]>>;
}