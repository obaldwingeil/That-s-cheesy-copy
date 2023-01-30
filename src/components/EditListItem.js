import React, { useState } from "react";
import { Input } from "reactstrap";
import "../css/EditListItem.css";

export default function EditListItem({ _delete, item, index, _update }) {

    const [empty, setEmpty] = useState(false);

    function _toggleEmpty(input) {
        if (input === "") setEmpty(true);
        else setEmpty(false);
    }

    return (
        <div className="EditListItem">
            {empty ? <div className="emptyListItem">Item cannot be empty</div> : <div/>}
            <Input
                type='text'
                defaultValue={item}
                onBlur={(e) => {_update(e.target.value, index); _toggleEmpty(e.target.value)}}
            />
            <button onClick={() => _delete(item)}>Delete</button>     
        </div>
    );
}