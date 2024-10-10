export function truncateFileName(fileName, maxLength = 20) {
    if (fileName.length > maxLength) {
        return fileName.substring(0, maxLength - 3) + '...';
    }
    return fileName;
}
