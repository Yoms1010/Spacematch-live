export async function POST(params: Request) {

    const {nin, firstname, lastname} = await params.json()

    const endpoint = `https://api.qoreid.com/v1/ng/identities/virtual-nin/${nin}`
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzaVgtaEFrS3RmNUlsYWhRcElrNWwwbFBRVlNmVnpBdG9WVWQ4UXZ1OHJFIn0.eyJleHAiOjE3NTk4NDEzMTcsImlhdCI6MTc1OTgzNDExNywianRpIjoiNTc5ZWU4ODQtOTUyMS00Y2I0LWE3MTEtYzU3OTY1MzU2ZjVhIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnFvcmVpZC5jb20vYXV0aC9yZWFsbXMvcW9yZWlkIiwiYXVkIjpbInFvcmVpZGFwaSIsImFjY291bnQiXSwic3ViIjoiMmUyZmZlYmQtYzIyNS00Y2U0LTkyMzEtNGQ4YWU1NzBjMjY5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiUzRFOEtISUkxSVNIVVdNN0xBWkUiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXFvcmVpZCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InFvcmVpZGFwaSI6eyJyb2xlcyI6WyJ2ZXJpZnlfdmlydHVhbF9uaW5fc3ViIiwidmVyaWZ5X251YmFuX3N1YiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94Iiwib3JnYW5pc2F0aW9uSWQiOjI1MjU2NCwiY2xpZW50SWQiOiJTNEU4S0hJSTFJU0hVV003TEFaRSIsImNsaWVudEhvc3QiOiIzNC4yNDUuNzcuMjE3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtczRlOGtoaWkxaXNodXdtN2xhemUiLCJhcHBsaWNhdGlvbklkIjoyNjI2NiwiY2xpZW50QWRkcmVzcyI6IjM0LjI0NS43Ny4yMTcifQ.OX8qBUqcLM3z6aZBArq-tc9aYXlJhTk89IAPSrpqXLNUAht10VWTUnHFu0Y8tzNbIrpoFq5SQqlRgASr3vhdn2QMSaqGy5eF4LXmroLQrZluEKbTYcTrGT33BSdOAinuNANzEaozmvR_Zk2xLodqNtsS-5FBet9JSs3NzxxRSgU48b1p13fepnp99D1y2ftZzJPeYLR9-0779Ihr4KKG8vKlKfGEkiCwCCxy6eE_tLVgaBITW2cmdzs-VzQ-Za_qNAC5_uGruKQIV6GJz5NfUzxjODu07Lu-6GCq1hFDKBiS0_4FjJBqUvktLTtt3GwjurUl35b86BQw40DuyVRXzw"

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json', 
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({firstname, lastname})
    };

    fetch(endpoint, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

}