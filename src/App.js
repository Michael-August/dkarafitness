import "./App.css";
import { PaymentForm } from "./components/PaymentForm";

import logo from "./images/logo.png";
import hostLogo from "./images/main-logo.png";

function App() {
	return (
		<div className="App bg-[#fffaf5] px-5 md:px-0 h-screen flex flex-col items-center">
			<nav className="w-full h-[10%]">
				<div className="w-[100px] md:w-[150px]">
					<img src={hostLogo} alt={"Tabata fest logo"} />
				</div>
			</nav>
			<header className="mb-6">
				<div className="logo flex pt-3 mb-4">
					<div className="w-[150px] md:w-[250px]">
						<img src={logo} alt={"Tabata fest logo"} />
					</div>
				</div>
				<div className="desc flex items-center flex-col">
					<span className="heading md:mb-2 text-3xl md:text-5xl text-[#565454]">
						Tabata Fest 5.0
					</span>
					<span className="motto font-bold text-[#ee0a6a] text-sm md:text-base">
						the fit effect
					</span>
				</div>
			</header>
			<PaymentForm />
		</div>
	);
}

export default App;
