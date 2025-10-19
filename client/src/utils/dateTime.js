export default function fromIsoDate(isoDate) {
    const date = new Date(isoDate);
    const formatedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'});
    return formatedDate; 
}