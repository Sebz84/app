import * as utility from '../utility';
import { rpcResponseSchemaMap } from '../schemas/rpcMethodSchemaMapping';
import * as methodNames from '../../constants/rpcMethods';
import {
  validateSchema,
  getTxnDetails,
  expected,
  listUnspentTwo,
} from './testData.json';
import log from 'loglevel';
import { mockAxios } from '../testUtils/mockUtils';
import { objectOf } from 'prop-types';
import { util } from 'prettier';

const DUST_VALUE_DFI = '0.00000546';
const DUST_VALUE_FI = '546';

describe('utility', () => {
  it('fetchPageNumbers when currentPage, totalPages, pageNeighbors', () => {
    const data = utility.fetchPageNumbers(0, 0, 0);
    expect(data).toHaveLength(0);
  });

  it('fetchPageNumbers with valid currentPage, totalPages, pageNeighbors', () => {
    const data = utility.fetchPageNumbers(1, 4, 1);
    expect(data).toHaveLength(3);
  });

  it('fetchPageNumbers with invalid currentPage, totalPages, pageNeighbors', () => {
    const data = utility.fetchPageNumbers(-1, -1, -1);
    expect(data).toHaveLength(0);
  });

  it('convertEpochToDate feature', () => {
    const data = utility.convertEpochToDate(1590584379);
    expect(data).toBe('May 27, 06:29 pm');
  });

  it('convertEpochToDate feature when value is null', () => {
    const data = utility.convertEpochToDate(null);
    expect(data).toBe('Jan 1, 05:30 am');
  });

  it('range feature value is valid', () => {
    const data = utility.range(1, 4);
    expect(data).toHaveLength(4);
  });

  it('range feature is to and from is invalid', () => {
    const data = utility.range(-1, -2);
    expect(data).toHaveLength(0);
  });

  it('dateTimeFormat is string', () => {
    const data = utility.dateTimeFormat('Wed May 27 2020 18:55:22');
    expect(data).toBe('May 27, 06:55 pm');
  });

  it('dateTimeFormat is Date object', () => {
    const data = utility.dateTimeFormat(new Date(2020, 4, 27, 19, 2, 15));
    expect(data).toBe('May 27, 07:02 pm');
  });

  it('getAddressAndAmount pass valid data ', async () => {
    const address = [
      '1AxAnLpXn9nDcqejmL4oKkGEDNUHRMmaHu',
      '1GteSB8ayQSuDVsoMCaCeBR5CbEKsbsDVM',
      '1DPYMWDzvSHYw2wW17cemB2XQc4jPfYegw',
    ];
    const testData = address.map((item) => ({
      address: item,
      amount: '',
    }));
    const data = await utility.getAddressAndAmount(testData, '');
    expect(data).toBeInstanceOf(Array);
    expect(data).toEqual(testData);
  });

  it('getTxnDetails valid data pass when category is not send and fee attribute is not present', async () => {
    const post = jest.fn().mockResolvedValueOnce({
      data: getTxnDetails.getBlock,
    });
    mockAxios(post);
    const testData = getTxnDetails.category_not_send_fee_not_present;
    const data = await utility.getTxnDetails(testData);
    expect(data).toBeInstanceOf(Array);
    expect(data).toEqual(
      expected.getTxnDetails.category_not_send_fee_not_present
    );
  });

  it('getTxnDetails valid data pass when category is send and fee attribute present ', async () => {
    const post = jest.fn().mockResolvedValueOnce({
      data: getTxnDetails.getBlock,
    });
    mockAxios(post);
    const testData = getTxnDetails.category_is_send_fee_present;
    const data = await utility.getTxnDetails(testData);
    expect(data).toBeInstanceOf(Array);
    expect(data).toEqual(expected.getTxnDetails.category_is_send_fee_present);
  });

  it('getTxnDetails valid data pass when category is not send and fee attribute present ', async () => {
    const post = jest.fn().mockResolvedValueOnce({
      data: getTxnDetails.getBlock,
    });
    mockAxios(post);
    const testData = getTxnDetails.category_is_not_send;
    const data = await utility.getTxnDetails(testData);
    expect(data).toBeInstanceOf(Array);
    expect(data).toEqual(expected.getTxnDetails.category_is_not_send);
  });

  it('getTransactionURI valid data without message and data ', async () => {
    const testData = {
      amount: 50.0,
      label: '',
      message: '',
    };

    const data = await utility.getTransactionURI(
      'fi',
      'bcrt1qpneu4759jp5xc7we4xzgrmskxteqeewytnxqm9',
      testData
    );
    expect(data).toBe(
      'fi:bcrt1qpneu4759jp5xc7we4xzgrmskxteqeewytnxqm9?amount=50'
    );
  });

  it('getTransactionURI valid data without message and data ', async () => {
    const testData = {
      amount: 50.0,
      label: 'random test',
      message: 'lorem ipsum',
    };

    const data = await utility.getTransactionURI(
      'fi',
      'bcrt1qpneu4759jp5xc7we4xzgrmskxteqeewytnxqm9',
      testData
    );
    expect(data).toBe(
      'fi:bcrt1qpneu4759jp5xc7we4xzgrmskxteqeewytnxqm9?amount=50&label=random+test&message=lorem+ipsum'
    );
  });

  it('getTransactionURI valid data with no extraprops ', async () => {
    const data = await utility.getTransactionURI(
      'fi',
      'bcrt1qpneu4759jp5xc7we4xzgrmskxteqeewytnxqm9',
      {}
    );
    expect(data).toBe('fi:bcrt1qpneu4759jp5xc7we4xzgrmskxteqeewytnxqm9');
  });

  it('should test getAmountInSelectedUnit when passed string', () => {
    const data = utility.getAmountInSelectedUnit('50', 'fi');
    expect(data).toBe('5000000000');
  });

  it('should test getAmountInSelectedUnit when passed value', () => {
    const data = utility.getAmountInSelectedUnit(50, 'fi');
    expect(data).toBe('5000000000');
  });

  it('should test getAmountInSelectedUnit when passed from', () => {
    const data = utility.getAmountInSelectedUnit(50, 'DFI', 'fi');
    expect(data).toBe('0.0000005');
  });

  it('should test isDustAmount when equal to DUST_VALUE_DFI and unit is DFI', () => {
    const data = utility.getAmountInSelectedUnit(DUST_VALUE_DFI, 'DFI');
    expect(data).toBe('0.00000546');
  });

  it('should test isDustAmount when equal to DUST_VALUE_DFI and unit is fi', () => {
    const data = utility.getAmountInSelectedUnit(DUST_VALUE_DFI, 'fi');
    expect(data).toBe('546');
  });

  it('should test isDustAmount when equal to DUST_VALUE_DFI and unit is DFI', () => {
    const data = utility.getAmountInSelectedUnit(DUST_VALUE_FI, 'DFI');
    expect(data).toBe('546');
  });

  it('should test isDustAmount when equal to DUST_VALUE_DFI and unit is fi', () => {
    const data = utility.getAmountInSelectedUnit(DUST_VALUE_FI, 'fi');
    expect(data).toBe('54600000000');
  });

  it('should test isDustAmount when equal to DUST_VALUE_DFI and unit is fi', () => {
    const data = utility.getAmountInSelectedUnit(0, 'fi');
    expect(data).toBe('0');
  });

  it('should test isDustAmount when equal to DUST_VALUE_DFI and unit is fi', () => {
    const data = utility.getAmountInSelectedUnit(1000, 'fi');
    expect(data).toBe('100000000000');
  });

  it('should test isDustAmount when equal to DUST_VALUE_DFI and unit is DFI', () => {
    const data = utility.getAmountInSelectedUnit(0, 'DFI');
    expect(data).toBe('0');
  });

  it('should test isDustAmount when equal to DUST_VALUE_DFI and unit is DFI', () => {
    const data = utility.getAmountInSelectedUnit(1000, 'DFI');
    expect(data).toBe('1000');
  });

  it('should test getTxnSize with two inputs', async () => {
    const post = jest.fn().mockResolvedValueOnce({
      data: listUnspentTwo,
    });
    mockAxios(post);

    const test = await utility.getTxnSize();
    expect(test).toEqual(expected.getTxnSize);
    expect(post).toBeCalledTimes(1);
  });

  it('validateSchema valid object', () => {
    const isValid = utility.validateSchema(
      rpcResponseSchemaMap.get(methodNames.LIST_TRANSACTIONS),
      validateSchema
    );
    expect(isValid).toBeTruthy();
  });

  it('validateSchema invalid object', () => {
    const spy = jest.spyOn(log, 'error');
    const data = Object.assign({}, validateSchema);
    delete (data as any).result[0].time;
    const isValid = utility.validateSchema(
      rpcResponseSchemaMap.get(methodNames.LIST_TRANSACTIONS),
      data
    );
    expect(isValid).toBeFalsy();
    expect(spy).toBeCalledTimes(1);
  });

  it('should return parsedCoinPriceData', async () => {
    const data = await utility.parsedCoinPriceData();
    expect(Object.keys(data)).toEqual(
      Object.keys(expected.parsedCoinPriceData)
    );
  });

  it('should return total Blocks', async () => {
    const result = await utility.getTotalBlocks();
    expect(typeof result.data).toBe('number');
  });

  it('should return Icon corresponding to symbol when symbol is valid', () => {
    const symbols = ['BTC', 'ETH', 'USDT', 'DFI'];
    const result = symbols.map((symbol) => utility.getIcon(symbol));
    expect(result).toStrictEqual([
      'test-file-stub',
      'test-file-stub',
      'test-file-stub',
      'test-file-stub',
    ]);
  });

  it('should fail when symbol is invalid', () => {
    const result = utility.getIcon('ABC');
    expect(result).toBe(undefined);
  });

  it('should return prices in USD of currency for valid currency', async () => {
    const symbols = ['BTC', 'ETH', 'USDT', 'DFI'];
    let result: object[] = [];
    for (const symbol in symbols) {
      if (symbols.hasOwnProperty(symbol)) {
        const data = await utility.getCoinPriceInUSD(symbol);
        result = [...result, data];
      }
    }
    expect(result).toEqual(expected.getCoinPriceInUSD);
  });

  it('should return number with commas in case of valid number', () => {
    const result = utility.numberWithCommas(1235430000);
    expect(result).toBe('1,235,430,000');
  });

  it('should return number with commas and string as suffix in case of number followed by suffic string', () => {
    const result = utility.numberWithCommas('123543ABC');
    expect(result).toBe('123,543ABC');
  });

  it('should return number with commas and string as prefix in case of prefix string followed by number', () => {
    const result = utility.numberWithCommas('ABC123543');
    expect(result).toBe('ABC123,543');
  });

  it('should return random number', () => {
    const result = utility.getRandomNumber(9, 20);
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(9);
    expect(result).toBeLessThanOrEqual(20);
  });

  it('should return network info for valid netwrork type: TEST', () => {
    const result = utility.getNetworkInfo('test');
    expect(Object.keys(result)).toEqual(Object.keys(expected.getNetworkInfo));
  });

  it('should return network info for valid netwrork type: MAIN', () => {
    const result = utility.getNetworkInfo('main');
    expect(Object.keys(result)).toEqual(Object.keys(expected.getNetworkInfo));
  });

  it('should count decimals for valid input', () => {
    const result = utility.countDecimals(123.01234);
    expect(result).toBe(5);
  });

  it('should pass when amount is less than dust amount', () => {
    const result = utility.isLessThanDustAmount(1, 'DFI');
    expect(result).toBeFalsy();
  });

  it('should pass when amount is less than dust amount', () => {
    const result = utility.isLessThanDustAmount(0.00000543, 'DFI');
    expect(result).toBeTruthy();
  });

  it('should return array as per page number', () => {
    const result = utility.paginate(
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
      3,
      2
    );
    expect(result).toEqual(['d', 'e', 'f']);
  });

  it('should return empty when length of array is less than page size and page number', () => {
    const result = utility.paginate(['a', 'b', 'c', 'd', 'e'], 3, 3);
    expect(result).toEqual([]);
  });

  it('should return mnemonic code', () => {
    const result = utility.getMnemonicFromObj({
      1: 'abc',
      2: 'def',
      3: 'ghi',
      4: 'jkl',
      5: 'lmn',
      6: 'opq',
      7: 'rst',
    });
    expect(result).toEqual('abc def ghi jkl lmn opq rst');
  });

  it('should return true if mnemonicCode is valid', () => {
    const result = utility.isValidMnemonic(
      'lab rescue lunch elbow recall phrase perfect donkey biology guess moment husband'
    );
    expect(result).toBeTruthy();
  });

  it('should return false if mnemonicCode is invalid', () => {
    const result = utility.isValidMnemonic('abc def ghi jkl lmn opq rst');
    expect(result).toBeFalsy();
  });

  it('should return mnemonic object', () => {
    const result = utility.getMnemonicObject();
    expect(Object.keys(result)).toEqual(['mnemonicObj', 'mnemonicCode']);
  });

  it('should return object from string array', () => {
    const result = utility.getObjectFromArrayString([
      'abc',
      'def',
      'ghi',
      'jkl',
    ]);
    expect(result).toEqual({ '1': 'abc', '2': 'def', '3': 'ghi', '4': 'jkl' });
  });

  it('should return rpc method name if query is valid', () => {
    const result = utility.getRpcMethodName('getBalance');
    expect(result).toBe('getBalance');
  });

  it('should return only rpc method name if query is valid and exclude defi-cli', () => {
    const result = utility.getRpcMethodName('defi-cli getBalance');
    expect(result).toBe('getBalance');
  });
});
