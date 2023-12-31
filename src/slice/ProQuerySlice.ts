import { createSlice } from '@reduxjs/toolkit';
import { PropType } from '../components/ProQueryProvider';

export type HeaderType = { key: string; value: string };

type ProQueryDataType = {
    name: string;
    token: PropType;
    baseUrl: PropType;
    prepareHeaders?: HeaderType[];
};

type ProQueryStateType = {
    dataList: ProQueryDataType[];
};

const ProQueryState: ProQueryStateType = {
    dataList: [{ baseUrl: undefined, name: 'Main', token: undefined }],
};

const ProQuerySlice = createSlice<
    ProQueryStateType,
    {
        setQueryData: (
            state: ProQueryStateType,
            action: {
                payload: ProQueryDataType;
            },
        ) => void;
        setQueryToken: (
            state: ProQueryStateType,
            action: {
                payload: Pick<ProQueryDataType, 'name' | 'token'>;
            },
        ) => void;
        setQueryBaseUrl: (
            state: ProQueryStateType,
            action: {
                payload: Pick<ProQueryDataType, 'name' | 'baseUrl'>;
            },
        ) => void;
        setQueryPrepareHeaders: (
            state: ProQueryStateType,
            action: {
                payload: Pick<ProQueryDataType, 'name' | 'prepareHeaders'>;
            },
        ) => void;
    },
    'ProQuery'
>({
    name: 'ProQuery',
    initialState: ProQueryState,
    reducers: {
        setQueryData: (state, { payload }) => {
            const dataIndex = state.dataList.findIndex((x) => x.name === payload.name);
            if (dataIndex === -1) {
                state.dataList.push(payload);
            } else {
                state.dataList[dataIndex] = payload;
            }
        },
        setQueryToken: (state, { payload }) => {
            const dataIndex = state.dataList.findIndex((x) => x.name === payload.name);
            if (dataIndex !== -1) {
                state.dataList[dataIndex].token = payload.token;
            }
        },
        setQueryBaseUrl: (state, { payload }) => {
            const dataIndex = state.dataList.findIndex((x) => x.name === payload.name);
            if (dataIndex !== -1) {
                state.dataList[dataIndex].baseUrl = payload.baseUrl;
            }
        },
        setQueryPrepareHeaders: (state, { payload }) => {
            const dataIndex = state.dataList.findIndex((x) => x.name === payload.name);
            if (dataIndex !== -1) {
                state.dataList[dataIndex].prepareHeaders = payload.prepareHeaders;
            }
        },
    },
});

export type ProQueryState = { ProQuery: ProQueryStateType };

export const selectQueryToken =
    (name = 'Main') =>
    (state: ProQueryState) =>
        state.ProQuery.dataList.find((x) => x.name === name)?.token;

export const selectQueryBaseUrl =
    (name = 'Main') =>
    (state: ProQueryState) =>
        state.ProQuery.dataList.find((x) => x.name === name)?.baseUrl;

export const selectQueryPrepareHeaders =
    (name = 'Main') =>
    (state: ProQueryState) =>
        state.ProQuery.dataList.find((x) => x.name === name)?.prepareHeaders;

export const { setQueryData, setQueryBaseUrl, setQueryToken, setQueryPrepareHeaders } = ProQuerySlice.actions;

export default ProQuerySlice.reducer;
