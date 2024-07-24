export function compareDates(dateStr1, dateStr2) {
    // Chuyển chuỗi ngày thành đối tượng Date
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    // Kiểm tra nếu ngày hợp lệ
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        throw new Error("Invalid date format");
    }

    // So sánh các đối tượng Date
    if (date1 > date2) {
        return "End date must be before start date";
    } 
     else {
        return "";
    }
}