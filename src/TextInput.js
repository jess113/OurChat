import React from 'react';

class TextInput extends React.Component {
    
    state={
        text:"",
    }
    
    send = () => {
        this.props.sendMessage(this.state.text)
        this.setState({text:""})
    }

    keyPress = (e) => {
        if(e.key==='Enter'){
            this.send()
        }
    }

    render(){
        return(<div className="text-input">
            <input value={this.state.text} 
                placeholder="Write your message here..."
                onChange={e=> this.setState({text: e.target.value})}
                onKeyPress={this.keyPress}
            />
            <button disabled={!this.state.text} onClick={this.send}>
                <i class="arrow up"></i>
            </button>
        </div>)
    }
}

export default TextInput