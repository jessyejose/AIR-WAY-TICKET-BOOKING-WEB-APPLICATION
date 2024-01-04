import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UserNav from './UserNav';
import MyNavbar from './MyNavbar';

function Editfeedback(){
	const [feedback,setFeedback]=useState('')
	const [date, setDate] = useState([]);
	const navigate = useNavigate();
	const location = useLocation()

	useEffect(()=>{
		let params ={
			id:location.state.id
		}
		fetch('http://localhost:4000/editfeedbackbyid',{
			method:'post',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(params)
		}).then((res)=>res.json()).then((result)=>{
			setFeedback(result.Feedback)
			setDate(result.Date)

		})
	},[location.state.id])

	const handleEdit =  (e) => {
		e.preventDefault();
		let params = {
			feedback:feedback,
			date:date,
		  	id:location.state.id
		};
		 fetch('http://localhost:4000/feedbackedit', {
		  method: 'post',
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(params),
		})
		  .then((res) => res.json())
		  .then((result) => {
			navigate('/feedback')
		  });
	  };

	return(
		<>
		<UserNav />

		<div style={{ backgroundImage: `url(/air.jpg)`, width: '100vw', height: '100%', backgroundSize: 'cover' }}>
			<MyNavbar />
			<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
					<div style={{width:'100%',backgroundColor:'#eeeeee',borderRadius:'10px',margin:'80px 20px'}}>
						<form onSubmit={handleEdit} >
							<div style={{ margin:'15px'}}>
								<label name="feedback"  style={{ display: 'block', color: '#333', marginTop:'83px' ,marginBottom:'10px',fontSize:'25px'}}>
									Feedback
								</label>
								<input type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box'}}/><br/>
								<label name="date"  style={{ display: 'block', color: '#333', marginTop:'83px' ,marginBottom:'10px',fontSize:'25px'}}>
									Date
								</label>
								<input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{width: '100%',padding: '10px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginBottom:'10px'}}/><br/>
								<button type="submit" style={{width: '25%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer',marginBottom:'83px'}}>
									Submit Feedback
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		
		</>
	)
}

export default Editfeedback