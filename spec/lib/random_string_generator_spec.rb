require 'random_string_generator'

describe RandomStringGenerator do
	
	it "can create a string" do
		result = RandomStringGenerator.generate_string
		result.should be_instance_of String 
	end

	it "creates strings with a default length of 32 characters" do
		result = RandomStringGenerator.generate_string
		result.length.should == 32
	end

	it "can accept an argument to create a string of given size" do
		result = RandomStringGenerator.generate_string 12
		result.length.should == 12
	end

	it "should create different strings on subsequent calls" do
		result_1 = RandomStringGenerator.generate_string
		result_2 = RandomStringGenerator.generate_string
		result_3 = RandomStringGenerator.generate_string

		result_1.should_not == result_2
		result_2.should_not == result_3
		result_1.should_not == result_3
	end

end