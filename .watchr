def run_spec( spec_file )
	
	unless File.exist? spec_file
		puts "#{spec_file} does not exist"
		return
	end

	puts "Running #{spec_file}"
	system "bundle exec rspec #{spec_file}"
	puts

end

watch("spec/.*/*_spec.rb") do |match|
	run_spec match[0]
end

watch("(app|lib)/(.*).rb") do |match|
	run_spec %{spec/#{match[1]}/#{match[2]}_spec.rb}
end

watch("config/routes.rb") do
	run_spec "spec/routing/routing_spec.rb"
end

