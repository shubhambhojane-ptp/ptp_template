type CheckResult<T = unknown> = {
    value: T;
    isValid: boolean;
    message?: string;
};

export const Checkjs = {
    Text: function(value: string): CheckResult<string> {
        return { value: value, isValid: value.trim().length > 1 };
    },
    TextOptional: function(value: string): CheckResult<string> {
        return { value: value, isValid: true };
    },
    Dropdown: function(value: string): CheckResult<string> {
        return { value: value, isValid: value.trim() !== '' };
    },
    Radio: function(value: string): CheckResult<string> {
        return { value: value, isValid: value.trim() !== '' };
    },
    Date: function(value: string): CheckResult<string> {
        return { value: value, isValid: value.trim() !== '' && !isNaN(Date.parse(value)) };
    },
    DateTime: function(value: string): CheckResult<string> {
        return { value: value, isValid: value.trim() !== '' && !isNaN(Date.parse(value)) };
    },
    Address: function(value: string): CheckResult<string> {
        return { value: value, isValid: value.trim().length > 5 };
    },
    Price: function(value: string): CheckResult<string> {
        const cleanValue = value.trim();
        if (/^free$/i.test(cleanValue)) {
            return { value: cleanValue, isValid: true };
        }
        const isValid = /^\d+(\.\d+)?\s*(fixed|negotiable)?$/i.test(cleanValue);
        return { value: cleanValue, isValid: isValid };
    },
    NumberOptional: function(value: string | number): CheckResult<string> {
        if (value === '' || value === null || value === undefined) {
            return { value: '', isValid: true };
        }
        const cleanValue = String(value).replace(/[^\d.]/g, '');
        return { value: cleanValue, isValid: cleanValue === '' || !isNaN(Number(cleanValue)) };
    },
    ImageUpload: function(file: File | null): Promise<CheckResult<string>> {
        if (!file) return Promise.resolve({ value: '', isValid: false });

        // Basic Extension Check
        if (!/(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i.test(file.name)) {
            return Promise.resolve({ value: '', isValid: false, message: 'Invalid file extension. Only JPG, PNG, GIF, WEBP allowed.' });
        }

        return new Promise((resolve) => {
            const magicReader = new FileReader();

            magicReader.onloadend = function() {
                if (magicReader.readyState === FileReader.DONE && magicReader.result) {
                    const arr = new Uint8Array(magicReader.result as ArrayBuffer);
                    const hex = Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

                    // Magic Number Verification
                    const isRealImage = hex.startsWith('FFD8FF') || hex === '89504E47' || hex === '47494638' || hex === '52494646';

                    if (!isRealImage) {
                        resolve({ value: '', isValid: false, message: 'Security Alert: Harmful or fake image file detected.' });
                        return;
                    }

                    resolve({ value: file.name, isValid: true, message: '' });
                }
            };

            magicReader.readAsArrayBuffer(file.slice(0, 4));
        });
    },
    ImageUploadMultiple: async function(files: File[] | null): Promise<CheckResult<string[]>> {
        if (!files || files.length < 1 || files.length > 4) {
            return { value: [], isValid: false, message: 'Please upload one to four photos.' };
        }

        const results = await Promise.all(files.map(file => Checkjs.ImageUpload(file)));
        const isValid = results.every(result => result.isValid);
        const failed = results.find(result => !result.isValid);

        return { value: results.map(result => result.value), isValid: isValid, message: isValid ? '' : failed?.message };
    },
};
