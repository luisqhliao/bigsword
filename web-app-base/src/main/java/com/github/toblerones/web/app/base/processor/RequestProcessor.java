package com.github.toblerones.web.app.base.processor;

import com.github.toblerones.web.app.context.WorkContext;

public interface RequestProcessor {
	public String process(WorkContext workContext);
}
