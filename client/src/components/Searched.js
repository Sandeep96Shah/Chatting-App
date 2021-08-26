import React from 'react';
import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import '../index.css';
//import { useState } from 'react';

 const Searched = ({name, id, clickHandle, handleAddFriend}) => {
    console.log("searched id", id);
    // const [search, setSearch] = useState("");
    // const fuse = new Fuse(props.friends.friends, {
    //     keys: [
    //       'name', 
    //     ],
    //     includeScore:true,
    //   });
    //   const results = fuse.search(search);
    // const characterResults = results.map(character => character.item);
    return (
        <div className="searched_friend">
            <div><p onClick={ () => clickHandle(name, id) }>{name}</p></div>
            <div><button onClick={ () => handleAddFriend(id) }>Add</button></div>
        </div>
    )
}

function mapStateToprops(state){
    return{
       friends:state.friends
    }
}


export default connect(mapStateToprops)(Searched);
