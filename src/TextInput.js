import React from 'react'

class TextInput extends React.Component {
    render(){
        return(<div className="text-input">
            <input />
            <button>
                <p><i class="arrow up"></i></p>
            </button>
        </div>)
    }
}

export default TextInput