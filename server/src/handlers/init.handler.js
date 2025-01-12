const initHandler = (data) => {
    // 문자열 뒤집기
    const processedData = data.toString().split('').reverse().join('');
    return Buffer.from(processedData);
}

export default initHandler;