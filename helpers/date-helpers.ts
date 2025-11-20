import { Timestamp } from 'firebase/firestore';

class DateHelpers {
    static formatFirebaseTimestamp(timestamp: Timestamp): string {
        const date = timestamp ? timestamp.toDate() : new Date();
        return date.toLocaleDateString();
    }

    static formatSanityDate(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

export default DateHelpers;