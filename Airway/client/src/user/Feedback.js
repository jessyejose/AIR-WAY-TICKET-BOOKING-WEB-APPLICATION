import React, { useState, useEffect } from "react";
import {useNavigate,Link} from "react-router-dom";
import UserNav from './UserNav';
import MyNavbar from './MyNavbar';

function Feedback(){
	const [feedback,setFeedback]=useState('')
	const [date, setDate] = useState([]);
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [refresh, setRefresh] = useState(0)
	
	useEffect(() => {
		fetch('http://localhost:4000/booking').then((res) =>
			res.json()
		).then((result) =>
			setData(result)
			// console.log(result)
		)
	}, [refresh])

	const handleSubmit = (e) => {
		e.preventDefault()
		let params = {
			feedback: feedback,
			date:date
		}
		fetch('http://localhost:4000/feedbackinsert', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(params)
		}).then((res) => res.json()).then((result) => {
			setRefresh((previous)=>previous+1)
			e.target.reset();
			navigate('/feedback')
		})
	}

	const handleDelete = (iD)=>{
		let params = {
			id:iD
		}
		fetch('http://localhost:4000/deletefeedback',{
			method:'post',
			headers:{
				Accept :'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(params)
		}).then((res)=>res.json()).then((result)=>{
			setRefresh((previous)=>previous+1)
		})
	}

	return(
		<>
		<UserNav />

		<div style={{ backgroundImage: `url(/air.jpg)`, width: '100vw', height: '100%', backgroundSize: 'cover' }}>
		    <MyNavbar />
			<div style={{ backgroundImage: `url(/air.jpg)`, textAlign: 'center', height: '120px', padding: '10px', color: '#000080',borderColor:'a0a0a0' }}>
				<h1 style={{  fontFamily: 'Georgia, Times New Roman, Times, serif', fontSize: '2em' }}>FEEDBACK</h1>
				<p style={{ fontSize: '18px', margin: '0' }}><b>Home </b>➡️ Feedback</p>
			</div>

			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',backgroundColor: '#E0E0E0', padding: '10px',height:'600px' }}>
				<div style={{width:'50%',backgroundColor:'#eeeeee',borderRadius:'10px',margin:'80px 20px'}}>
					<form onSubmit={handleSubmit} >
						<div style={{ margin:'15px'}}>
							<label name="feedback"  style={{ display: 'block', color: '#333', marginTop:'83px' ,marginBottom:'10px',fontSize:'25px'}}>
								Feedback
							</label>
							<input type="text"  onChange={(e) => setFeedback(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box'}}/><br/>
							<label name="date"  style={{ display: 'block', color: '#333', marginTop:'83px' ,marginBottom:'10px',fontSize:'25px'}}>
								Date
							</label>
							<input type="date"  onChange={(e) => setDate(e.target.value)} style={{width: '100%',padding: '10px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginBottom:'10px'}}/><br/>
							<button type="submit" style={{width: '25%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer',marginBottom:'83px'}}>
								Submit Feedback
							</button>
						</div>
					</form>
				</div>

				<div style={{width:'50%',backgroundColor:'#eeeeee',borderRadius:'10px',margin:'80px 20px'}}>
					<div style={{ margin:'15px'}}>
						<table border="1" className="table table-striped" style={{ margin:'100px 5px',}}>
							<thead style={{ margin:'15px',textAlign:'center'}}>
								<tr style={{ margin:'15px',}}>
									<th style={{ width: '40%' }}>Feedback</th>
									<th style={{ width: '40%' }}>Date</th>
									<th colSpan={2} style={{ width: '30%' }}>Action</th>
								</tr>
							</thead>
							<tbody style={{ margin:'15px'}}>
							{data.map((item, index) => {
								return (
									<tr key={item._id}>
										<td>{item.Feedback}</td>
										<td>{item.Date}</td>
										<td>{item.Price}</td>
										<td><Link to="/feedbackedit" state={{id:item._id}} style={{background: '#007bff',color: 'white',padding: '7px',textDecoration: 'none',borderRadius: '5px',display: 'inline-block',}}>Edit</Link></td>
										<td><button onClick={()=>handleDelete(item._id)} className="btn btn-danger">delete</button></td>
									</tr>
								);
							})}


							</tbody>
						</table>
					</div>

				</div>
			</div>
		</div>
		
		</>
	)
}

export default Feedback