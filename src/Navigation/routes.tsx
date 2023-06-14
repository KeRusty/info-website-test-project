import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
const Login = lazy(() => import("../Views/Login/Login"));
const TableView = lazy(() => import('../Views/Dataset/Dataset'));

function AllRoutes() {
    return (
        <Suspense>
            <Routes>
                <Route path={"/"} element={<Login />} />
                <Route path={"/dataset"} element={<TableView />} />
            </Routes>
        </Suspense>
    )
}

export default AllRoutes