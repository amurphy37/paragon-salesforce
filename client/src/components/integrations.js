import React, { Component } from 'react';
import { InformationCircleIcon} from '@heroicons/react/20/solid'
import Axios from 'axios'

const integrations = [
    {
        name: 'Salesforce',
        title: 'Paradigm Representative',
        role: 'CRM',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://i.imgur.com/RgDM2c3.jpg',
    },
    {
        name: 'Slack',
        title: 'Paradigm Representative',
        role: 'Collaboration',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://i.imgur.com/OAw5bBo.png',
    },
    {
        name: 'Outreach',
        title: 'Paradigm Representative',
        role: 'Sales Development',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://i.imgur.com/tFf1Boc.png',
    },
    {
        name: 'Saleshood',
        title: 'Paradigm Representative',
        role: 'Sales Enablement',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://i.imgur.com/EIPyXZD.png',
    },
    // More people...
]


class Integration extends Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        try {
            console.log("click handled")

            const defaultData = await Axios({
                method: "GET",
                url: "http://localhost:8080/"
            })

            console.log(defaultData)

            const projectID = "bd28f38e-e56a-44a9-ae2a-3b937a1707ae"
            const paragonUserToken = defaultData.data.user.paragonUserToken

            console.log(paragonUserToken)
            console.log(window)

            await window.paragon.authenticate(projectID, paragonUserToken)

            const user = await window.paragon.getUser()

            console.log(user)

            await window.paragon.connect("salesforce")

        }
        catch (err) {
            throw err
        }

    }

    // async componentDidMount () {
    //     try {
    //     console.log("main component mounted")

        // const defaultData = await Axios({
        //     method: "GET",
        //     url: "http://localhost:8080/"
        // })

        // const projectID = "bd28f38e-e56a-44a9-ae2a-3b937a1707ae"
        // const paragonUserToken = defaultData.data.user.paragonUserToken

        // await window.paragon.authenticate(projectID, paragonUserToken)

        // const user = await window.paragon.getUser()

        // console.log(user)

        // await window.paragon.connect("salesforce")


    //     // call paragon.authenticate()

    //     // get back authenticate data, save to state

    //     // set url to /paragonConnect

    //     //  paragonConnect.js component\
    // }
    // catch (error) {
    //     console.log("error: " + error.message)
    // }
    // }
    render() {
        return (
            <div>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Integrations</h1>
                    </div>
                </header>
                <br></br>
                <main>
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {integrations.map((integration) => (
                            <li
                                key={integration.email}
                                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                            >
                                <div className="flex flex-1 flex-col p-8">
                                    <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={integration.imageUrl} alt="" />
                                    <h3 className="mt-6 text-sm font-medium text-gray-900">{integration.name}</h3>
                                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                                        <dt className="sr-only">Role</dt>
                                        <dd className="mt-3">
                                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                {integration.role}
                                            </span>
                                        </dd>
                                    </dl>
                                </div>
                                <div>
                                    <div className="-mt-px flex divide-x divide-gray-200">
                                        <div className="-ml-px flex w-0 flex-1">
                                            <button
                                                onClick = {this.handleClick}
                                                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                            >
                                                <InformationCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <span className="ml-3">Learn More</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>       
        )
    }
}

export default Integration;