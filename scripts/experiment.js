// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {
    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
    
    // Select 10 random images from the 100 available
    const selected_images = _.shuffle(all_images).slice(0, 10);
    
    // Create trial data with selected images
    main_trials = selected_images.map(function(image) {
        return { image: image };
    });
    
    this.trial_info.main_trials = main_trials;

    let ai_option = {
        "text": "This is an AI-generated image.",
        "value": "AI"
    };
    let real_option = {
        "text": "This is an actual image captured by a camera.",
        "value": "real"
    };
    let notsure_option = {
        "text": "Not sure.",
        "value": "not_sure"
    };
    let option_list = _.shuffle([ai_option, real_option]);
    option_list.push(notsure_option);
    this.trial_info.aiclass_randomizedoptions = option_list;

    this.trial_info.stage_randomizedorder = _.shuffle([0,1,2]);
    
    console.log("Selected images for trials:");
    console.log(main_trials);
    
    // Build view sequence with alternating stage1 and stage2 for 10 trials
    this.views_seq = [intro];
    this.views_seq.push(instructions);
    
    for (let i = 0; i < 10; i++) {
        this.views_seq.push(stage1);
        this.views_seq.push(stage2);
    }
    
    this.views_seq.push(aiclassification);
    this.views_seq.push(postTest);
    this.views_seq.push(thanks);

    // adds progress bars to the views listed
    this.progress_bar_in = ["stage1", "stage2", "aiclassification"];
    // styles: chunks, separate or default
    this.progress_bar_style = "default";
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};
