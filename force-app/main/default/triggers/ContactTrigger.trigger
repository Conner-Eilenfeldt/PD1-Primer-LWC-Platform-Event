trigger ContactTrigger on Contact (after update) {

    switch on trigger.operationType {
        when AFTER_UPDATE{
            ContactTrigger_Helper.publishMessage(trigger.new);
        }
    }
}