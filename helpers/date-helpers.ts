import { Timestamp } from 'firebase/firestore';

class DateHelpers {
    static formatFirebaseTimestamp(timestamp: Timestamp): string {
        const date = timestamp ? timestamp.toDate() : new Date();
        return date.toLocaleDateString();
    }
}

export default DateHelpers;