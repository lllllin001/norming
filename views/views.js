var intro = {
    name: "intro",
    // introduction title
    title: "Stanford NLP Group",
    // introduction text
    text:
     "Welcome to the study!<br><br>People use various physical features to describe others all the time. In this study, you will see a total of <strong>10 images</strong>, and your task is to provide judgements for each image.<br><br>Please pay close attention to the questions, and answer each question carefully. The whole study should take no longer than <strong>15 minutes</strong>.<br><small>If you have any questions or concerns, don't hesitate to contact me at llin001@ucla.edu.</small> ",
     legal_info: 
     `<strong>LEGAL INFORMATION</strong><br><br>
<strong>UNIVERSITY OF CALIFORNIA, LOS ANGELES</strong><br><br>
<strong>STUDY INFORMATION</strong><br>
A Study of Perceiving People<br><br>
Lin Lin & Elisa Kreiss from the Department of Communication at the University of California, Los Angeles are conducting a research study. Your participation in this research study is completely voluntary. By signing this statement you are agreeing you are over the age of 18.<br><br>

<strong>WHAT SHOULD I KNOW ABOUT A RESEARCH STUDY?</strong><br>
\u25CF Someone will explain this research study to you.<br>
\u25CF Whether or not you take part is up to you.<br>
\u25CF You can choose not to take part.<br>
\u25CF You can agree to take part and later change your mind.<br>
\u25CF Your decision will not be held against you.<br>
\u25CF You can ask all the questions you want before you decide.<br><br>

<strong>WHY IS THIS RESEARCH BEING DONE?</strong><br>
You are being asked to participate in this study because the researcher wants to understand how people describe others and make judgments.<br><br>

<strong>HOW LONG WILL THE RESEARCH LAST AND WHAT WILL I NEED TO DO?</strong><br>
Participation will take a total of about 15 minutes. If you volunteer to participate in this study, the researcher will ask you to do the following:<br>
\u25CF Evaluate and describe 10 headshot images.<br>
\u25CF Complete questionnaires about your background.<br><br>

<strong>ARE THERE ANY RISKS IF I PARTICIPATE?</strong><br>
There are no anticipated discomforts or risks.<br><br>

<strong>ARE THERE ANY BENEFITS IF I PARTICIPATE?</strong><br>
You will not directly benefit from your participation in the research. However, the results of the research may help us to better understand what determines people’s judgments of others.<br><br>

<strong>WHAT OTHER CHOICES DO I HAVE IF I DECIDE NOT TO PARTICIPATE?</strong><br>
Your alternative to participating in this research study is to not participate.<br><br>

<strong>HOW WILL INFORMATION ABOUT ME AND MY PARTICIPATION BE KEPT CONFIDENTIAL?</strong><br>
The researchers will do their best to make sure that your private information is kept confidential. Information about you will be handled as confidentially as possible, but participating in research may involve a loss of privacy and the potential for a breach in confidentiality. Study data will be physically and electronically secured. As with any use of electronic means to store data, there is a risk of breach of data security.<br><br>

<strong>Use of personal information that can identify you:</strong><br>
We will not collect any personal information that could identify you.<br><br>

<strong>How information about you will be stored:</strong><br>
The anonymized data collected as part of this study will be stored in a safe and secure location.<br><br>

<strong>People and agencies that will have access to your information:</strong><br>
The research team, authorized UCLA personnel, may have access to study data and records to monitor the study. Research records provided to authorized, non-UCLA personnel will not contain identifiable information about you. Publications and/or presentations that result from this study will not identify you by name.<br><br>

Employees of the University may have access to identifiable information as part of routine processing of your information, such as lab work or processing payment. However, University employees are bound by strict rules of confidentiality.<br><br>

<strong>How long information from the study will be kept:</strong><br>
Any data that might carry a risk of potential de-anonymization will be destroyed within a year after the study. The anonymized data will be stored in a data repository for future research use.<br><br>

<strong>USE OF DATA FOR FUTURE RESEARCH</strong><br>
Your data, including de-identified data, may be kept for use in future research.<br><br>

<strong>WILL I BE PAID FOR MY PARTICIPATION?</strong><br>
You will receive $2.5 for your participation in this study.<br><br>

<strong>UCLA Office of the Human Research Protection Program (OHRPP):</strong><br>
If you have questions about your rights as a research subject, or you have concerns or suggestions and you want to talk to someone other than the researchers, you may contact the UCLA OHRPP by phone: (310) 206-2040; by email: <a href='mailto:participants@research.ucla.edu'>participants@research.ucla.edu</a> or by mail: Box 951406, Los Angeles, CA 90095-1406.<br><br>

<strong>WHAT ARE MY RIGHTS IF I TAKE PART IN THIS STUDY?</strong><br>
\u25CF You can choose whether or not you want to be in this study, and you may withdraw your consent and discontinue participation at any time.<br>
\u25CF Whatever decision you make, there will be no penalty to you, and no loss of benefits to which you were otherwise entitled.<br>
\u25CF You may refuse to answer any questions that you do not want to answer and still remain in the study.<br><br>`,

    // introduction's slide proceeding button text
    buttonText: "Begin experiment",
    // render function renders the view
    render: function() {
        var viewTemplate = $("#intro-view").html();
        
        $("#main").html(
        Mustache.render(viewTemplate, {
                picture: "stimuli/stanford-nlp-logo.jpg",
                title: this.title,
                text: this.text,
                legal_info: this.legal_info,
                button: this.buttonText
            })
        );

        var prolificId = $("#prolific-id");
        var IDform = $("#prolific-id-form");
        var next = $("#next");

        var showNextBtn = function() {
            if (prolificId.val().trim() !== "") {
                next.removeClass("nodisplay");
            } else {
                next.addClass("nodisplay");
            }
        };

        if (config_deploy.deployMethod !== "Prolific") {
            IDform.addClass("nodisplay");
            next.removeClass("nodisplay");
        }

        prolificId.on("keyup", function() {
            showNextBtn();
        });

        prolificId.on("focus", function() {
            showNextBtn();
        });

        // moves to the next view
        next.on("click", function() {
            if (config_deploy.deployMethod === "Prolific") {
                exp.global_data.prolific_id = prolificId.val().trim();
            }

            exp.findNextView();
        });
    },
    // for how many trials should this view be repeated?
    trials: 1
};

var instructions = {
    name: "instructions",
    render: function(CT) {
        var viewTemplate = $("#instructions-view").html(); // don't think we even need mustache yet

        $("#main").html(
            Mustache.render(viewTemplate, {})
        );

        var next_button = $("#next");

        next_button.on('click', function () {
            exp.findNextView();
        });

    },
    trials: 1
};

// Stage 1: Typicality ratings for man, woman, and nonbinary person
var stage1 = {
    name: "stage1",
    render: function(CT) {
        console.log(exp.trial_info.main_trials[CT]);
        var viewTemplate = $("#stage1-view").html();

        let image_path = "images/" + exp.trial_info.main_trials[CT]['image'];
        let gender_options = ["man", "woman", "non-binary person"];
        let q1 = "How strongly do you associate this person’s appearance with that of a <strong>" + gender_options[exp.trial_info.stage_randomizedorder[0]] + "</strong> in your culture?"
        let q2 = "How strongly do you associate this person’s appearance with that of a <strong>" + gender_options[exp.trial_info.stage_randomizedorder[1]] + "</strong> in your culture?"
        let q3 = "How strongly do you associate this person’s appearance with that of a <strong>" + gender_options[exp.trial_info.stage_randomizedorder[2]] + "</strong> in your culture?"

        $("#main").html(
            Mustache.render(viewTemplate, {
                image: image_path,
                q1: q1,
                q2: q2,
                q3: q3,
                q1_slider_left: "Not at all",
                q1_slider_right: "Very much"
            })
        );

        window.scrollTo(0,0);

        // functions
        function responses_complete() {
            return($('input[name=slider_q1]:checked').val() > 0 && 
                   $('input[name=slider_q2]:checked').val() > 0 && 
                   $('input[name=slider_q3]:checked').val() > 0)
        };

        // event functions
        $("#next").on("click", function(e) {
            if (!responses_complete()) {
                $('#error').css({"display": "block"});
            }
            else {
                rt_stage1_done = Date.now();

                var q1_rating = parseInt($('input[name=slider_q1]:checked').val());
                var q2_rating = parseInt($('input[name=slider_q2]:checked').val());
                var q3_rating = parseInt($('input[name=slider_q3]:checked').val());


                var rating_dict = {
                    "q1": {
                        "gender": gender_options[exp.trial_info.stage_randomizedorder[0]], 
                        "rating": q1_rating
                    },
                    "q2": {
                        "gender": gender_options[exp.trial_info.stage_randomizedorder[1]], 
                        "rating": q2_rating
                    },
                    "q3": {
                        "gender": gender_options[exp.trial_info.stage_randomizedorder[2]], 
                        "rating": q3_rating
                    }
                };

                console.log(rating_dict);

                let maxValue = 0;
                let highest_category_list = ["undefined"];

                for (const [_, value] of Object.entries(rating_dict)) {
                    if (value["rating"] > maxValue) {
                        maxValue = value["rating"];
                        highest_category_list = [value["gender"]];
                    } else if (value["rating"] == maxValue) {
                        highest_category_list.push(value["gender"]);
                    }
                }

                var highest_category = _.shuffle(highest_category_list)[0]
                console.log("highest_category_list");
                console.log(highest_category_list);
                console.log("highest_category");
                console.log(highest_category);

                // Store ratings and highest category in trial data
                var trial_data = {
                    trial_number: CT + 1,
                    stage: 1,
                    image: exp.trial_info.main_trials[CT]['image'],
                    q1_rating: rating_dict["q1"]["rating"],
                    q1_gender: rating_dict["q1"]["gender"],
                    q2_rating: rating_dict["q2"]["rating"],
                    q2_gender: rating_dict["q2"]["gender"],
                    q3_rating: rating_dict["q3"]["rating"],
                    q3_gender: rating_dict["q3"]["gender"],
                    highest_category: highest_category,
                    rt_stage1: (rt_stage1_done - startingTime) / 1000
                };
                
                // Store the highest category for stage 2
                exp.trial_info.main_trials[CT]['highest_category'] = highest_category;

                exp.trial_data.push(trial_data);
                exp.findNextView();
            }
        })

        // record trial starting time
        var startingTime = Date.now();
    },
    trials: 1
};

// Stage 2: Feature listing based on highest rated category
var stage2 = {
    name: "stage2",
    render: function(CT) {
        console.log(exp.trial_info.main_trials[CT]);
        var viewTemplate = $("#stage2-view").html();

        let image_path = "images/" + exp.trial_info.main_trials[CT]['image'];
        let highest_category = exp.trial_info.main_trials[CT]['highest_category'];

        $("#main").html(
            Mustache.render(viewTemplate, {
                image: image_path,
                category: highest_category,
                article: 'a'
            })
        );

        window.scrollTo(0,0);

        // functions
        function responses_complete() {
            // All three typical features must be filled
            var typical1 = $('#typical1').val().trim();
            var typical2 = $('#typical2').val().trim();
            var typical3 = $('#typical3').val().trim();
            return typical1.length > 0 && typical2.length > 0 && typical3.length > 0;
        };

        // event functions
        $("#next").on("click", function(e) {
            if (!responses_complete()) {
                $('#error').css({"display": "block"});
            }
            else {
                rt_stage2_done = Date.now();
                
                var trial_data = {
                    trial_number: CT + 1,
                    stage: 2,
                    image: exp.trial_info.main_trials[CT]['image'],
                    category: highest_category,
                    typical_feature1: $('#typical1').val().trim(),
                    typical_feature2: $('#typical2').val().trim(),
                    typical_feature3: $('#typical3').val().trim(),
                    atypical_feature1: $('#atypical1').val().trim(),
                    atypical_feature2: $('#atypical2').val().trim(),
                    atypical_feature3: $('#atypical3').val().trim(),
                    rt_stage2: (rt_stage2_done - startingTime) / 1000
                };

                exp.trial_data.push(trial_data);
                exp.findNextView();
            }
        })

        // record trial starting time
        var startingTime = Date.now();
    },
    trials: 1
};

var aiclassification = {
    name: "aiclassification",
    render: function(CT) {
        var viewTemplate = $("#aiclassification-view").html();

        console.log("exp.trial_info.main_trials[CT]");
        console.log(exp.trial_info.main_trials[CT]);

        let image_path = "images/" + exp.trial_info.main_trials[CT]['image'];

        // let ai_option = {
        //     "text": "This is an AI-generated image.",
        //     "value": "AI"
        // };
        // let real_option = {
        //     "text": "This is an actual image captured by a camera.",
        //     "value": "real"
        // };
        // let notsure_option = {
        //     "text": "Not sure.",
        //     "value": "not_sure"
        // };

        // let option_list = _.shuffle([ai_option, real_option]);

        $("#main").html(
            Mustache.render(viewTemplate, {
                image: image_path,
                "optionA_text": exp.trial_info.aiclass_randomizedoptions[0]["text"],
                "optionB_text": exp.trial_info.aiclass_randomizedoptions[1]["text"],
                "optionC_text": exp.trial_info.aiclass_randomizedoptions[2]["text"],
                "optionA_value": exp.trial_info.aiclass_randomizedoptions[0]["value"],
                "optionB_value": exp.trial_info.aiclass_randomizedoptions[1]["value"],
                "optionC_value": exp.trial_info.aiclass_randomizedoptions[2]["value"]
            })
        );

        function responses_complete() {
            return $('input[name=answer]:checked').length > 0;
        };

        $("#next").on("click", function(e) {
            if (!responses_complete()) {
                $('#error').css({"display": "block"});
            }
            else {
                rt_complete = Date.now();
                
                var trial_data = {
                    trial_number: CT + 1,
                    stage: "ai_classification",
                    image: exp.trial_info.main_trials[CT]['image'],
                    aiclass_optionA: exp.trial_info.aiclass_randomizedoptions[0]["value"],
                    aiclass_optionB: exp.trial_info.aiclass_randomizedoptions[1]["value"],
                    aiclass_optionC: exp.trial_info.aiclass_randomizedoptions[2]["value"],
                    aiclass_answer: $('input[name=answer]:checked').val(),
                    rt_aiclass: (rt_complete - startingTime) / 1000
                };

                exp.trial_data.push(trial_data);
                exp.findNextView();
            }
        })

        // record trial starting time
        var startingTime = Date.now();

    },
    trials: 10
};


var postTest = {
    name: "postTest",
    title: "Additional Info",
    text:
        "Answering the following questions is optional, but will help us understand your answers.",
    buttonText: "Continue",
    render: function() {
        var viewTemplate = $("#post-test-view").html();
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title,
                text: this.text,
                buttonText: this.buttonText
            })
        );

        $("#next").on("click", function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.HitCorrect = $("#HitCorrect").val();
            exp.global_data.age = $("#age").val();
            // exp.global_data.education = $("#education").val();
            exp.global_data.languages = $("#languages").val();
            exp.global_data.enjoyment = $("#enjoyment").val();
            exp.global_data.comments = $("#comments")
                .val()
                .trim();
            // exp.global_data.difficulties = $("#difficulties")
            //     .val()
            //     .trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent =
                (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        });
    },
    trials: 1
};

var thanks = {
    name: "thanks",
    message: "Thank you for taking part in this experiment!",
    render: function() {
        var viewTemplate = $("#thanks-view").html();

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if (
            config_deploy.is_MTurk ||
            config_deploy.deployMethod === "directLink"
        ) {
            // updates the fields in the hidden form with info for the MTurk's server
            $("#main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message
                })
            );
        } else if (config_deploy.deployMethod === "Prolific") {
            $("main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message,
                    extraMessage:
                        "Please press the button below to confirm that you completed the experiment with Prolific. Your completion code is C1KNH7KI.<br />" +
                        "<a href=" +
                        config_deploy.prolificURL +
                        ' class="prolific-url">Confirm</a>'
                })
            );
        } else if (config_deploy.deployMethod === "debug") {
            $("main").html(Mustache.render(viewTemplate, {}));
        } else {
            console.log("no such config_deploy.deployMethod");
        }

        exp.submit();
    },
    trials: 1
};

function toggleTextbox() {
    var genderSelect = document.getElementById("gender");
    var otherGenderContainer = document.getElementById("other-gender-container");

    if (genderSelect.value === "other") {
        otherGenderContainer.style.display = "block"; // Show textbox
    } else {
        otherGenderContainer.style.display = "none"; // Hide textbox
    }
}

