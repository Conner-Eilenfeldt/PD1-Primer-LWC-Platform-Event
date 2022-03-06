public with sharing class ContactTrigger_Helper {

    public static void publishMessage(List<Contact> cons){

        for (Contact con : cons) {
            // Create event instance.
            Contact_Updated__e event = new Contact_Updated__e(Id__c = con.id);
    
            // Publish event.
            Database.SaveResult sr = EventBus.publish(event);
    
            // Inspect publishing result for each event
            if (sr.isSuccess()) {
                System.debug('Successfully published event.');
            }
            else {
                for(Database.Error err : sr.getErrors()) {
                System.debug('Error returned: ' +
                    err.getStatusCode() +
                    ' - ' +
                    err.getMessage());
                }
            }
        }
    }
}
