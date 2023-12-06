import { useState, useEffect } from "react";

function App() {
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState({});

	const [user, setUser] = useState({});
	const [token, setToken] = useState("");

	async function getTasks() {
		try {
			const response = await fetch("http://localhost:8000/api/tasks/", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (data) {
				setTasks(data);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function postTask(body) {
		try {
			const response = await fetch("http://localhost:8000/api/tasks/", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			});
			const data = await response.json();
			if (data) {
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function getToken() {
		// brunodiaz :: brunosilabuz123
		try {
			const response = await fetch("http://localhost:8000/auth/token/", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const data = await response.json();
			if (data) {
				console.log(data);
				setToken(data.access);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div className="container-sm mt-5">
			<h1 className="display-3">Todo App</h1>
			<hr />
			<h2>Auth Token</h2>
			<div className="card p-3 shadow">
				{token !== "" ? (
					<p>{token}</p>
				) : (
					<div className="input-group mb-0">
						<input
							type="text"
							name="username"
							className="form-control"
							placeholder="User"
							autoComplete="off"
							onChange={(event) => {
								if (event.target.value !== "") {
									setUser({
										...user,
										username: event.target.value,
									});
								}
							}}
						/>
						<input
							type="password"
							name="password"
							className="form-control"
							placeholder="Password"
							autoComplete="off"
							onChange={(event) => {
								if (event.target.value !== "") {
									setUser({
										...user,
										password: event.target.value,
									});
								}
							}}
						/>
						<button
							className="btn btn-primary"
							onClick={async () => {
								await getToken();
							}}
						>
							Login
						</button>
					</div>
				)}
			</div>

			<hr />
			<div className="card p-3 shadow">
				<div className="input-group mb-0">
					<input
						type="text"
						name="nombre"
						className="form-control"
						placeholder="new task..."
						autoComplete="off"
						onChange={(event) => {
							if (event.target.value !== "") {
								setTask({
									...task,
									nombre: event.target.value,
								});
							}
						}}
					/>
					<input
						type="number"
						name="prioridad"
						className="form-control"
						placeholder="priority (1,2,3)"
						autoComplete="off"
						onChange={(event) => {
							if (event.target.value !== "") {
								setTask({
									...task,
									prioridad: event.target.value,
								});
							}
						}}
					/>
					<button
						className="btn btn-primary"
						onClick={async () => {
							await postTask(task);
							await getTasks();
						}}
					>
						Add
					</button>
					<button
						className="btn btn-secondary"
						onClick={async () => {
							await getTasks();
						}}
					>
						Refresh
					</button>
				</div>
			</div>
			<hr />
			<ul className="list-group shadow">
				{tasks &&
					tasks.length > 0 &&
					tasks.map((task, index) => {
						return (
							<li key={index} className="list-group-item">
								{task.nombre} / Prioridad: {task.prioridad}
							</li>
						);
					})}
			</ul>
		</div>
	);
}

export default App;
