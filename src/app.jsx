import { useState } from 'preact/hooks';
import './app.css';
import getRange from './get-range.js';
let startAt = 26;
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

export function App() {
  const [count, setCount] = useState(0);
  const eventId = '20220523@17:45';
  const onSubmit = (e) => {
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
    const msg = `${e.target.eventId.value}: ${getRange(seats)}, ${
      seats.length * price
    }:-`;
    alert(msg);
  };
  return (
    <>
      <header>
        <h1>Mån 23/5 kl. 17:45</h1>
      </header>
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
