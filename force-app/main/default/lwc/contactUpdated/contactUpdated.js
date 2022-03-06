import { LightningElement } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';

export default class ContactUpdated extends LightningElement {
    channelName = '/event/Contact_Updated__e';
    subscription = {};
    recordId;
    displayContact;

    // Initializes the component
    connectedCallback() {
        // Register error listener
        this.registerErrorListener();
        // Subscribe to Platform Event
        this.handleSubscribe();
    }

    disconnectedCallback() {
        // Unsubscribe to Platform Event
        this.handleUnsubscribe();
    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback = (response) => {
            console.log('New message received: ', JSON.stringify(response));
            // Response contains the payload of the new message received
            
            this.recordId = JSON.stringify(response.data.payload.Id__c);
            // get rid of the " " around the id
            this.recordId = this.recordId.slice(1, -1);
            this.displayContact = true;
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            // Response contains the subscription information on subscribe call
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;
        });
    }

    // Handles unsubscribe button click
    handleUnsubscribe() {
        // Invoke unsubscribe method of empApi
        unsubscribe(this.subscription, (response) => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
            // Response is true for successful unsubscribe
        });
    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }
}