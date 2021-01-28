import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isFetching: false,
  rpcRemotes: [],
  rpcConfig: { rpcauth: '', rpcconnect: '', rpcport: '' },
  isRunning: false,
  rpcConfigError: '',
  nodeError: '',
  configurationData: {},
  isQueueReady: false,
  isAppClosing: false,
  isRPCOpen: true,
};

const configSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    getRpcConfigsRequest(state) {
      state.isFetching = true;
    },
    getRpcConfigsSuccess(state, action) {
      state.rpcRemotes = action.payload.remotes;
      if (state.rpcRemotes && state.rpcRemotes.length) {
        const {
          rpcuser,
          rpcpassword,
          rpcconnect,
          rpcport,
        } = state.rpcRemotes[0];
        state.rpcConfig = {
          rpcauth: `${rpcuser}:${rpcpassword}`,
          rpcconnect,
          rpcport,
        };
      }
      state.isFetching = false;
      state.rpcConfigError = '';
    },
    getRpcConfigsFailure(state, action) {
      state.isFetching = false;
      state.rpcRemotes = [];
      state.rpcConfig = { rpcauth: '', rpcconnect: '', rpcport: '' };
      state.rpcConfigError = action.payload;
    },
    startNodeRequest(state) {
      state.isFetching = true;
    },
    startNodeSuccess(state) {
      state.isRunning = true;
      state.isFetching = false;
      state.rpcConfigError = '';
    },
    startNodeFailure(state, action) {
      state.isFetching = false;
      state.isRunning = false;
      state.nodeError = action.payload;
    },
    storeConfigurationData(state, action) {
      state.configurationData = action.payload;
    },
    setQueueReady(state) {
      state.isQueueReady = true;
    },
    killQueue(state) {
      state.isQueueReady = false;
    },
    isAppClosing(state, action) {
      state.isAppClosing = action.payload.isAppClosing;
      state.isFetching = action.payload.isAppClosing;
    },
    isRPCOpen(state, action) {
      state.isRPCOpen = action.payload.isRPCOpen;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  getRpcConfigsRequest,
  getRpcConfigsSuccess,
  getRpcConfigsFailure,
  startNodeRequest,
  startNodeSuccess,
  startNodeFailure,
  storeConfigurationData,
  setQueueReady,
  killQueue,
  isAppClosing,
  isRPCOpen,
} = actions;

export default reducer;
