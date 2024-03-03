import React from 'react';
import './style.css'

class TriangleCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: { x: 0, y: 0 }, // A nuqta koordinatalari
      b: { x: 0, y: 0 }, // B nuqta koordinatalari
      c: { x: 0, y: 0 }, // C nuqta koordinatalari
      x: { x: 0, y: 0 }, // X nuqta koordinatalari
      isInside: false,
      submitted: false 
    };
  }

  checkIfInsideTriangle = () => {
    const { a, b, c, x } = this.state;


    const AB = { x: b.x - a.x, y: b.y - a.y };
    const AC = { x: c.x - a.x, y: c.y - a.y };
    const AX = { x: x.x - a.x, y: x.y - a.y };


    const dotABAB = AB.x * AB.x + AB.y * AB.y;
    const dotABAC = AB.x * AC.x + AB.y * AC.y;
    const dotABAX = AB.x * AX.x + AB.y * AX.y;
    const dotACAC = AC.x * AC.x + AC.y * AC.y;
    const dotACAX = AC.x * AX.x + AC.y * AX.y;

    const baryX = (dotACAC * dotABAX - dotABAC * dotACAX) / (dotABAB * dotACAC - dotABAC * dotABAC);
    const baryY = (dotABAB * dotACAX - dotABAC * dotABAX) / (dotABAB * dotACAC - dotABAC * dotABAC);


    const isInside = baryX >= 0 && baryY >= 0 && baryX + baryY <= 1;

    this.setState({ isInside });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.checkIfInsideTriangle();
    this.setState({ submitted: true });
  };

  handleChange = (event, point) => {
    const { name, value } = event.target;
    const [xValue, yValue] = value.split(',').map(coord => parseFloat(coord.trim()));
    this.setState(
      prevState => ({
        [point]: { ...prevState[point], x: xValue, y: yValue }
      }),
      () => {
        if (this.state.submitted) {
          this.checkIfInsideTriangle();
        }
      }
    );
  };

  render() {
    const { isInside, submitted } = this.state;

    return (
      <div className='corner'>

        <div className='corner-title'>
          <div className='corner-title-item'><span>A </span> , <span> B</span> , <span>C</span> Uchburchak ichida <span>X</span> kordinata shu uchburchakni ichida yoki tashqarisidaligini aniqlaydi</div>
        </div>

        <div className='section'>

            <form onSubmit={this.handleSubmit}>

                  <div className='form-inputs'>
                    <label>A nuqta (x, y):</label>
                    <input type="text" name="a" onChange={e => this.handleChange(e, 'a')} />
                  </div>

                  <div className='form-inputs'>
                    <label>B nuqta (x, y):</label>
                    <input type="text" name="b" onChange={e => this.handleChange(e, 'b')} />
                  </div>

                  <div className='form-inputs'>
                    <label>C nuqta (x, y):</label>
                    <input type="text" name="c" onChange={e => this.handleChange(e, 'c')} />
                  </div>

                  <div className='form-inputs'>
                    <label>X nuqta (x, y):</label>
                    <input type="text" name="x" onChange={e => this.handleChange(e, 'x')} />
                  </div>

                  <div className='form-btn'>
                    <button type="submit">Submit</button>
                  </div>

                  {submitted && <p>{isInside ? 'X kordinata uchburchakning ichida' : 'X kordinata uchburchakning ichida emas !'}.</p>}

            </form>

        </div>

      </div>
    );
  }
}

export default TriangleCheck;
