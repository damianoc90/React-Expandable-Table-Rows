const retrieveData = () =>
    fetch('example-data.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response =>
        response.json()
    );

export default retrieveData;