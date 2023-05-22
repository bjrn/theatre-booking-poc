import { useState } from 'preact/hooks';
import './app.css';
import getRange from './get-range.js';

const initialStartAt = 26;
let startAt = initialStartAt;
const startRow = 3;

const rows = {
  3: 13,
  4: 13,
  5: 13,
  6: 13,
  7: 14,
  8: 15,
  9: 16,
  10: 16,
  11: 15,
  12: 14,
};

async function fetchQR(msg, amount) {
  const url = 'https://api.swish.nu/qr/v2/prefilled';
  //const url = 'https://mpc.getswish.net/qrg-swish/api/v1/prefilled';
  const response = await fetch(url, {
    method: 'post',
    //mode: 'no-cors',
    body: JSON.stringify({
      format: 'png', // can be jpg, png or svg
      payee: '12345678',
      amount: { value: amount, editable: false },
      message: { value: msg, editable: false },
      size: 512,
      border: 2,
    }),
    headers: { 'Content-Type': 'application/json' },
  }).catch(console.warn);

  const blob = await response.blob();
  // return blob
  const imageBlob = blob;
  // const imageBlob = await fetchImage(url)
  const imageBase64 = URL.createObjectURL(imageBlob);

  console.log({ imageBase64 });
  return imageBase64;
}

export function App() {
  const [qr, setQR] = useState('');
  const eventId = '20220523@17:45';
  const onSubmit = async (e) => {
    e.preventDefault();
    const seats = [];
    e.target['seat'].forEach((i) => {
      if (i.checked) {
        if (i.value.startsWith('hcp')) {
          seats.push(i.value);
        } else {
          seats.push(Number(i.value));
        }
      }
    });
    const price = 50;
    const msg = `${e.target.eventId.value}: ${getRange(seats)}`;
    const amount = seats.length * price;

    //const qrCode = await fetchQR(msg, amount);
    //setQR(qrCode);
    startAt = initialStartAt;
    console.info(amount, msg, qrCode);
    // alert(msg);
  };
  return (
    <>
      <header>
        <h1>Mån 23/5 kl. 17:45</h1>
      </header>
      {!qr ? null : (
        <img
          src={qr}
          alt=""
          width="256"
          onClick={() => {
            setQR('');
            startAt = initialStartAt;
          }}
        />
      )}
      <main>
        <form action="book" onSubmit={onSubmit} method="get">
          <input type="hidden" name="eventId" value={eventId} />
          <div class="room">
            <div class="seats">
              {Object.entries(rows).map(([row, seats]) => {
                return (
                  <div class="row">
                    <span class="row-number">Rad {row}</span>
                    {[...Array.from(Array(seats))].map((seat) => {
                      const nr = startAt;
                      startAt++;
                      const isAvailable = nr > 50 && nr < 128;
                      return (
                        <label class="seat">
                          <input
                            type="checkbox"
                            name="seat"
                            value={nr}
                            disabled={!isAvailable}
                          />
                          <b>{nr}</b>
                        </label>
                      );
                    })}
                  </div>
                );
              })}

              <div class="row hcp-row">
                <label class="seat">
                  <input
                    type="checkbox"
                    name="seat"
                    value="hcp1"
                    disabled={false}
                  />
                  <b>hcp</b>
                </label>

                <label class="seat">
                  <input
                    type="checkbox"
                    name="seat"
                    value="hcp2"
                    disabled={false}
                  />
                  <b>hcp</b>
                </label>
                <span class="spacer"></span>
                <label class="seat">
                  <input
                    type="checkbox"
                    name="seat"
                    value="hcp3"
                    disabled={false}
                  />
                  <b>hcp</b>
                </label>
                <label class="seat">
                  <input
                    type="checkbox"
                    name="seat"
                    value="hcp4"
                    disabled={false}
                  />
                  <b>hcp</b>
                </label>
              </div>
            </div>

            <div class="stage">Scenen</div>
          </div>
          <input type="submit" />
        </form>
      </main>
    </>
  );
}
