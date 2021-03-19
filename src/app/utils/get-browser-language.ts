export function getLanguage(): string {
    let language = localStorage.getItem('language');
    if (language && language != null && language != '') {
        language = localStorage.getItem('language');
    } else {
        language = window.navigator.language;
        localStorage.setItem('language', language);
    }

    return language;
}