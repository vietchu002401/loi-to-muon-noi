import React, { Component } from 'react';
import './App.scss';
import image from "./assets/shy.jpg"
import tanjiro from "./assets/tanjiro.jpg"
import niji from "./assets/niji.mp3"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ["Cậu ơi...", "Thực ra...", "Tớ đã thầm thương trộm nhớ cậu suốt bao lâu nay rồi...", "Tình cảm nhỏ bé này bây giờ tớ mới dám nói ra...", "Tuy tớ không phải mẫu con trai hoàn hảo nhưng...!!", "Cậu đã có người yêu chưa...?", "Nếu chưa có thì cậu với tớ hãy thành người yêu của nhau nhé!!!"],
      count: 0,
      fade: true,
      question: false,
      left: "60%",
      top: "110%",
      display: "flex",
      input: false,
      notification: false,
      send: "Bởi vì cậu tốt bụng, thông minh, nấu ăn ngon, nhẹ nhàng và cũng rất nam tính. Đặc biệt là bởi cậu yêu tớ rất nhiều đó <3 <3 <3 !!!!",
      slice: 0,
      notification2: false
    }
  }

  
  audio = new Audio(niji)
  handleNextMessage = () => {
    this.audio.volume = 0.5
    this.audio.play()
    this.setState({
      fade: false
    })
    this.timeOut(800)
  }
  timeOut = (time) => {
    setTimeout(() => {
      this.setState({
        fade: true,
        count: this.state.count + 1
      })
      if (this.state.count === this.state.messages.length - 1) {
        this.setState({ question: true })
      }
    }, time)
  }
  timeOutNext = (time) => {
    setTimeout(() => {
      this.setState({
        fade: true,
        count: this.state.count + 1
      })
    }, time)
  }

  handleReject = () => {
    this.setState({
      left: Math.floor(Math.random(-10) * 100) + "%",
      top: Math.floor(Math.random(-110) * 120) + "%"
    })
  }
  handleDelete = () => {
    this.setState({
      display: "none",
      notification: true
    })
  }
  handleAccept = () => {
    this.setState({
      messages: [...this.state.messages, "Cậu có thể cho tớ biết vì sao cậu cũng thích tớ không...?"],
      question: false,
      count: this.state.count + 1,
      input: true
    })
  }
  handleSend = () => {
    this.setState({
      slice: this.state.slice + 1,
      notification2: false
    })
  }

  handleSubmit = () => {
    if (this.state.slice < this.state.send.length) {
      this.setState({ notification2: true })
    } else {
      this.setState({
        messages: [...this.state.messages, "Cảm ơn cậu!! Yêu cậu nhiều lắm hihi!!!"],
        count: this.state.count + 1,
        input: false
      })

    }
  }
  render() {
    let { messages, fade, count, question, top, left, display, input, notification, send, slice, notification2 } = this.state

    let renderNext = () => {
      if (count === messages.length - 1) {
        return null
      } else {
        return (
          <svg onClick={this.handleNextMessage} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-forward-fill icon" viewBox="0 0 16 16">
            <path d="m9.77 12.11 4.012-2.953a.647.647 0 0 0 0-1.114L9.771 5.09a.644.644 0 0 0-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557z" />
          </svg>
        )
      }
    }
    let renderAccept = (question) => {
      if (question) {
        return (
          <div onClick={this.handleAccept} style={{ backgroundColor: "green" }} className="accept">
            <h2>Đồng ý luôn</h2>
          </div>
        )
      }
    }
    let renderReject = (question) => {
      if (question) {
        return (
          <div onClick={this.handleDelete} onMouseOver={this.handleReject} style={{ top: top, left: left, backgroundColor: "red", display: display }} className="accept">
            <h2>Còn lâu</h2>
          </div>
        )
      }
    }
    let renderInput = (input) => {
      if (input) {
        return (
          <div className="input">
            <input onChange={this.handleSend} value={send.slice(0, slice)} type="text" placeholder="Lời yêu thương cho tớ!!!" />
            <div className="btn">
              <button onClick={this.handleSubmit}>
                Gửi
              </button>
            </div>
          </div>
        )
      } else {
        return null
      }
    }
    let renderNotification = (notification) => {
      if (notification) {
        return (
          <div className="notification">
            <img src={image} alt="shy" />
            <h3>Tớ đoán là cậu không may nhấn nhầm, nên tớ mở đường sẵn cho cậu đó, đừng ngại nữa <svg style={{ color: "red" }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg> !!!!</h3>
          </div>
        )
      } else {
        return null
      }
    }
    let renderNotification2 = (notification2) => {
      if (notification2) {
        return (
          <div style={{ width: "50%" }} className="notification">
            <img src={tanjiro} alt="shy" />
            <h3>Gửi lời nhắn ngắn quá là tớ không iu nữa đâu nhé.. <svg style={{ color: "red" }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg> !!!!</h3>
          </div>
        )
      } else {
        return null
      }
    }

    let somethingDifferent = ()=>{
      console.log("something")
    }
    return (
      <div className="container">
        <div className={fade ? "message-in" : "message-out"}>
          <h1>{messages[count]}</h1>
          {renderNext()}
          {renderAccept(question)}
          {renderReject(question)}
          {renderInput(input)}
        </div>
        {renderNotification(notification)}
        {renderNotification2(notification2)}
      </div>
    );
  }
}

export default App;
