import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditClass({ classToEdit }) {

    const navigate = useNavigate();

    const [class_name, setName] = useState(classToEdit.class_name);
    const [start_date, setStartDate] = useState(classToEdit.start_date);
    const [start_time, setStartTime] = useState(classToEdit.start_time);
    const [class_instructor_id, setInstructorId] = useState(classToEdit.instructor_id);
    const [class_desc, setClassDesc] = useState(classToEdit.class_desc);


    const [instructor_ids, getInstructorIds] = useState([]);

    const loadInstructorIds = async () => {
        const response = await fetch("/get_instructor_ids");
        const instructor_ids = await response.json();
        getInstructorIds(instructor_ids);
    };

    useEffect(() => {
        loadInstructorIds();
    }, []);

    const editClass = async () => {
        const response = await fetch(`/edit-class/${classToEdit.class_id}`, {
            method: 'PUT',
            body: JSON.stringify({ class_name:class_name, start_date:start_date, start_time:start_time, 
                                    class_instructor_id:class_instructor_id, class_desc:class_desc}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.status === 200){
            alert("Successfully edited the class!");
        } else {
            alert(`Failed to edit class, status code = ${response.status}`);
        };
        navigate('/classes');
    };

    return <div>
        <h1>Edit Class</h1>
        <p></p>
        <table>
            <td>
                <p>** All fileds are required to edit Class **</p>
                <form onSubmit={e => { e.preventDefault() }}>
                <input
                    type="text"
                    placeholder="Class Name"
                    value={class_name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="date"
                    placeholder={start_date}
                    value={start_date}
                    onChange={e => setStartDate(e.target.value)} />
                <input
                    type="time"
                    placeholder="Time"
                    value={start_time}
                    onChange={e => setStartTime(e.target.value)} />
                <select
                    value={class_instructor_id}
                    onChange={e => setInstructorId(e.target.value)}>
                    <option> -- Select Instructor Id --</option>
                    {instructor_ids.map((instructor_id, i) => <option value={instructor_id.instructor_id} key={i}>{instructor_id.instructor_id}</option>)}
                </select>
                <input
                    type="text"
                    placeholder="Class Description"
                    value={class_desc}
                    onChange={e => setClassDesc(e.target.value)} />
                <button
                    onClick={editClass}
                >Save</button>
                </form>
            </td>
        </table>
    </div>
};

export default EditClass;
