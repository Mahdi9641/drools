package com.example.drools.controller;


import com.example.drools.model.Loan;
import com.example.drools.model.Person;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RuleController {

    private final KieContainer kieContainer;

    public RuleController(KieContainer kieContainer) {
        this.kieContainer = kieContainer;
    }

    @PostMapping("/run/{group}")
    public String runRules(@PathVariable String group, @RequestBody Person person) {
        KieSession kieSession = kieContainer.newKieSession("defaultKieSession");
        kieSession.insert(person);

        // تنظیم گروه فعال
        kieSession.getAgenda().getAgendaGroup(group).setFocus();
        kieSession.fireAllRules();
        kieSession.dispose();

        return "Rules executed for agenda group: " + group;
    }

    @PostMapping("/loan/process")
    public String processLoan(@RequestBody Loan loan) {
        KieSession kieSession = kieContainer.newKieSession("defaultKieSession");
        kieSession.insert(loan);
        kieSession.fireAllRules();
        kieSession.dispose();
        return loan.getStatus();
    }
}
